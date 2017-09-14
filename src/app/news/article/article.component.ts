import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AppConstants } from '../../app.constants';

declare var _: any;
declare var moment: any;
declare var $: any;
declare var window: any;

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements AfterViewInit {
  user: any;
  components: Array<any> = [];
  today: any;
  imgURI = AppConstants.imgURI;
  path: string;
  page: any = {};
  pageObj: any = {};

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router) {
    moment.locale('vi');
  }

  ngOnInit() {
  }

  initFirebase() {
    this.pageObj = this.db.object('/articles/' + this.path);
    this.pageObj.subscribe((snapshot: any) => {
      this.page = snapshot;
      this.today = moment(this.page.datetime).format('LLLL');
      this.components = this.page.body || [];
    });
  }

  back() {
    this.router.navigate(['news']);
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
       this.path = params['pageid'];
       this.initFirebase();
    });
  }
}
