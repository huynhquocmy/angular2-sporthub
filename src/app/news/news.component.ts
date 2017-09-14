import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AppConstants } from '../app.constants';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

declare var _: any;
declare var moment: any;
declare var $: any;

@Component({
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements AfterViewInit {
  user: any;
  url: string;
  loaded = false;
  pages: Array<any> = [];
  projectObj: any;
  imgURI = AppConstants.imgURI;

  constructor(
    private dialog: MdDialog,
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
        orderByChild: 'isPublished',
        equalTo: true
      }
    });
    this.projectObj.subscribe((snapshot: any) => {
      var pages = _.orderBy(snapshot, 'isFavorite');
      this.pages = pages;
      this.loaded = true;
    });
  }

  ngOnInit() {
  }

  gotoPage(p: any) {
    this.router.navigate(['news/article', p.$key]);
  }

  ngAfterViewInit() {
  }
}
