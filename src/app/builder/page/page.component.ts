import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { CommonService } from '../../_services/common.service';
import { UserService } from '../../_services/user.service';
import { ContenttoolService } from '../../_services/contenttool.service';
import { VideoComponent } from '../elements/video/video.component';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

declare var _: any;
declare var moment: any;
declare var $: any;
declare var window: any;

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements AfterViewInit {
  user: any;
  components: Array<any> = [];
  today: any;
  path: string;
  page: any = {};
  pageObj: any = {};

  constructor(
    private _commonService: CommonService,
    private userService: UserService,
    private tool: ContenttoolService,
    private dialog: MdDialog,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router) {
    moment.locale('vi');
    if (!window.content) {
      this.tool.init(this.updateText.bind(this));
    }
    this.callback = this.callback.bind(this);
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }

  updateText(regions: any) {
    _.each(regions, (value: any, key: any) => {
      let component = _.find(this.components, (c: any) => {
        return String(c.id) === String(key);
      });
      component.value = value;
    });
  }

  initFirebase() {
    this.pageObj = this.db.object('/articles/' + this.path);
    this.pageObj.subscribe((snapshot: any) => {
      this.page = snapshot;
      this.today = moment(this.page.datetime).format('LLLL');
      this.components = this.page.body || [];
      this.initTool();
    });
  }

  addVideo() {
    let dialogRef = this.dialog.open(VideoComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let date = new Date();
        this.components.push({
          id: date.getTime(),
          type: 'video',
          url: res
        });
      }
    });
  }

  addComponent(type: string) {
    let date = new Date();
    let item: any = {
      id: date.getTime(),
      type: type
    };
    if (type === 'text') {
      item.value = '<p class="ce-element ce-element--type-text text-center">Viết bài của bạn...</p>';
    }

    this.components.push(item);

    if (type === 'text') {
      this.initTool();
    }
  }

  removeComponent(item: any) {
    _.remove(this.components, (c: any) => {
      return c.id === item.id;
    });
  };

  back() {
    this.router.navigate(['project']);
  }

  publish() {
    this.page.isPublished = !this.page.isPublished;
    this.save();
  }

  pin(item: any) {
    this.page.featured = item.url;
    this.save();
  }

  delete() {
    this.page.deleted = true;
    this.page.isPublished = false;
    this.save();
    this.back();
  }

  save() {
    this.pageObj.update({
      featured: this.page.featured,
      isPublished: this.page.isPublished,
      isFavorite: this.page.isFavorite,
      deleted: this.page.deleted,
      title: this.page.title,
      body: this.components
    });
  }

  callback(item: any) {
    let hasImage = _.find(this.components, (c) => {
      return c.type === 'image' && c.url !== item.url;
    });

    if (!hasImage) {
      this.page.featured = item.url;
    }
    this.save();
  }

  toggleFavorite() {
    this.page.isFavorite = !this.page.isFavorite;
    this.save();
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
       this.path = params['pageid'];
       this.initFirebase();
    });
  }

  initTool() {
    setTimeout(() => {
      if (window.content) {
        window.content.start();
      }
    }, 100);
  }
}
