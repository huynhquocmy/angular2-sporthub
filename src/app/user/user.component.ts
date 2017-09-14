import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from './user.service';
import { UserService } from '../_services/user.service';
import { AlertService } from '../common/alert/alert.service';
import { AppConstants } from '../app.constants';
import { CommonService } from '../_services/common.service';
declare var _: any;

@Component({
    templateUrl: '../profile/general/general.component.html',
    styleUrls: ['../profile/general/general.component.css', './user.component.css'],
    providers: [  ]
})
export class UserComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  skills: Array<object> = [];
  originalSkills: Array<object> = [];
  id: string;
  user: any = {};
  me: any;
  private sub: any;

  reviews: Array<any> = [];
  userReview: any;
  hideReviews = false;
  review: any = {
    comment: '',
    skillRatings: []
  };
  imgURI = AppConstants.imgURI;

  constructor (
    private accountService: AccountService,
    private userService: UserService,
    private alertService: AlertService,
    private commonService: CommonService,
    private route: ActivatedRoute) {}

  ngOnInit() {

    /*get login user*/

    let me = localStorage.getItem('user');
    this.me = JSON.parse(me);

    this.sub = this.route.params.subscribe(params => {
       this.id = params['userid'];
       this.getUser(this.id);
       if (!this.me || this.id === this.me.id) {
         this.hideReviews = true;
       }
    });

    this.userService.getUser().subscribe((me: any) => {
      if (me) {
        this.me = me;
      }
    });

    this.getInfo();
  }

  getInfo() {
    this.commonService.getInfo()
    .subscribe(
       (res: any) => {
        this.originalSkills = _.cloneDeep(res.data.skills);
        this.skills = _.cloneDeep(res.data.skills);
       }
     );
  }

  overStars(rating: number, skill: any) {
    skill.tempRating = rating;
  }

  blurStars(skill: any) {
    skill.tempRating = skill.rating;
  }

  selectStars(rating: number, skill: any) {
    skill.rating = rating;
  }

  reviewComment() {
    this.reviewInfo();
    if (this.review.skillRatings.length < this.skills.length) {
      this.alertService.alert({
        content: 'Bạn cần chọn tất cả tiêu chí để đánh giá !'
      }, null);
      return;
    }
    this.reviewUser();
  }

  reviewInfo() {
    let skills:any = [];
    _.each(this.skills, (skill: any) => {
      if (skill.tempRating) {
        skills.push({
          skillId: skill.id,
          mark: skill.tempRating
        });
      }
    });
    this.review.skillRatings = skills;
  }

  reviewUser() {
    if (!this.me) {
      this.alertService.alert({
        content: 'Bạn cần đăng nhập để đánh giá người chơi!'
      }, null);
      return;
    }

    this.review.userId = this.user.id;

    this.accountService.reviewUser(this.review)
    .subscribe(
      (res: any) => {
        this.reviews = res.data.reviews;

        this.user = Object.assign({}, this.user, {
          reviews: res.data.reviews,
          skillRatings: res.data.skillRatings,
          rating: res.data.overallRating
        });

        this.alertService.alert({
          content: 'Cảm ơn, đánh giá của bạn đã được gởi!'
        }, null);

        this.review = {
          comment: '',
          skillRatings: []
        };

        this.skills = _.cloneDeep(this.originalSkills);
      });
  }

  getUser(id: string) {
    this.accountService.getUser(id)
    .subscribe(
      (res: any) => {
        this.user = res.data;
        this.reviews = res.data.reviews;
      });
  }
}
