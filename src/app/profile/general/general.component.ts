import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../user/user.service';
import { AppConstants } from '../../app.constants';
import { CommonService } from '../../_services/common.service';

@Component({
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.css'],
    providers: [  ]
})
export class ProfileGeneralComponent implements OnInit {
  user: any = {};
  loading = false;
  returnUrl: string;
  reviews: Array<any> = [];
  userId: any;
  userReview: any;
  hideReviews = true;
  skills: any;
  review: any = {
    comment: ''
  };
  imgURI = AppConstants.imgURI;

  constructor (
    private accountService: AccountService,
    private commonService: CommonService
  ) {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    this.userId = user.id;
  }

  getUser(id: string) {
    this.accountService.getUser(id)
    .subscribe(
      (res: any) => {
        this.user = res.data;
        this.review.rating = res.data.rating;
        this.reviews = res.data.reviews;
      });
  }

  getInfo() {
    this.commonService.getInfo()
    .subscribe(
       (res: any) => {
        this.skills = res.data.skills;
       }
     );
  }

  ngOnInit() {
    this.getInfo();
    this.getUser(this.userId);
  }
}
