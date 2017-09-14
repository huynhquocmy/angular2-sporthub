import { Component, AfterViewInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

declare var _: any;
declare var $: any;

@Component({
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})

export class AddArticleComponent implements AfterViewInit {
  user: any = {};
  title: string;
  articles: any;
  articlesObj: any;

  constructor(
    private dialogRef: MdDialogRef<any>,
    private router: Router,
    private userService: UserService,
    private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.initFirebase();
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }

  initFirebase() {
    this.articlesObj = this.db.list('/articles');
    this.articlesObj.subscribe((snapshot: any) => {
      this.articles = snapshot;
    });
  }

  close() {
    this.dialogRef.close();
  }

  remove_unicode(str: string) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
  }

  save() {
    if (!this.title) {
      return;
    }
    var decode = this.remove_unicode(this.title);
    var updates = {
      title: this.title,
      datetime: new Date(),
      isPublished: false,
      isFavorite: false,
      featured: false,
      deleted: false,
      author: 'sporthub.vn',
      body: []
    };
    this.articlesObj.update(decode, updates);
    this.dialogRef.close(decode);
  }

  ngAfterViewInit() {
  }
}
