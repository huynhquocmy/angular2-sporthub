import { Component, Input } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from '../../app.constants';
import { UserService } from '../../_services/user.service';
import { UserCommentsService } from './user-comments.service';
import { MdDialog } from '@angular/material';
import { AlertService } from '../alert/alert.service';
import { LoginComponent } from '../../login/login.component';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

declare var _: any;
declare var moment: any;

@Component({
  selector: 'user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})

export class UserCommentsComponent implements AfterViewInit {

  @Input() match: any;
  @Input() type: string;

  loading = false;
  user: any = {
    id: '',
    fullName: ''
  };
  comment: any = {
    message: ''
  };
  imgURI = AppConstants.imgURI;
  testComments: FirebaseListObservable<any[]>;
  comments: Array<any>;

  constructor(
    private userService: UserService,
    private userCommentsService: UserCommentsService,
    private dialog: MdDialog,
    private router: Router,
    private alertService: AlertService,
    private db: AngularFireDatabase) {}

  initFirebase() {
    this.testComments = this.db.list('/comments/' + this.match.id);
    this.testComments.subscribe((snapshot: any) => {
      this.comments = snapshot;
    });
  }

  selectUser(userid: string) {
    this.router.navigate(['user', userid]);
  }

  checkHeight(id: string) {
    id = 'textarea-' + id;
    let el = document.getElementById(id);
    el.style.height = "42px";
    el.style.height = (el.scrollHeight + 10)+"px";
  }

  resetHeight(id: string) {
    id = 'textarea-' + id;
    let el = document.getElementById(id);
    el.style.height = "42px";
  }

  openLogin() {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.addComment();
      }
    });
  }

  addComment() {
    if (!this.comment.message) {
      return;
    }
    let message = this.comment.message.replace(/[']/g, '').trim();
    if (!message) {
      return;
    }
    if (!this.user.id) {
      this.alertService.alert({
        content: 'Bạn cần đăng nhập để tổ chức trận đấu!'
      }, this.openLogin.bind(this));
      return;
    }

    let d = new Date();

    this.comment.id = d.getTime();
    this.comment.userId = this.user.id;
    this.comment.message = message;
    this.comment.fullName = this.user.fullName;
    this.comment.avatar = this.user.avatar || "";
    this.comment.commentedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    this.resetHeight('new');
    this.resetHeight('new-mobile');
    this.testComments.push(this.comment);
    this.comment = {};
  }

  editComment(comment: any) {
    comment.edit = true;
    setTimeout(() => {
      this.checkHeight(comment.id);
    });
  }

  removeComment(comment: any) {
    this.testComments.remove(comment.$key);
  }

  saveComment(comment: any) {
    if (!comment.message) {
      return;
    }
    let message = comment.message.replace(/[']/g, '').trim();
    if (!message) {
      return;
    }
    comment.message = message;
    comment.edit = false;
    this.testComments.update(comment.$key, comment);
  }

  ngAfterViewInit() {
    this.initFirebase();
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
