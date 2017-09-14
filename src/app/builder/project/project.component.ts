import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AppConstants } from '../../app.constants';
import { CommonService } from '../../_services/common.service';
import { UserService } from '../../_services/user.service';
import { AddArticleComponent } from '../elements/add-article/add-article.component';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

declare var _: any;
declare var moment: any;
declare var $: any;

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements AfterViewInit {
  user: any;
  url: string;
  loaded = false;
  pages: Array<any> = [];
  projectObj: any;
  imgURI = AppConstants.imgURI;

  constructor(
    private dialog: MdDialog,
    private _commonService: CommonService,
    private userService: UserService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router) {
    this.router.events.subscribe((val: any) => {
        this.url = val.url;
    });
    this.initFirebase();
  }

  initFirebase() {
    this.projectObj = this.db.list('/articles/', {
      query: {
        orderByChild: 'deleted',
        equalTo: false
      }
    });
    this.projectObj.subscribe((snapshot: any) => {
      this.pages = snapshot;
      this.loaded = true;
    });
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }

  gotoPage(p: any) {
    this.router.navigate(['project/page', p.$key]);
  }

  createNew() {
    let dialogRef = this.dialog.open(AddArticleComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigate(['project/page', res]);
      }
    });
  }

  ngAfterViewInit() {
  }
}
