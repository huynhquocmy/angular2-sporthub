import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchService } from './game.service';
import { AlertService } from '../../common/alert/alert.service';
import { UserService } from '../../_services/user.service';
import { OtpComponent } from '../../signup/otp.component';
import { LoginComponent } from '../../login/login.component';
import { MdDialog } from '@angular/material';
import { CommonService } from '../../_services/common.service';

declare var moment: any;
declare var $: any;
declare var google: any;
declare var _: any;

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements AfterViewInit {

  info: any;
  lat = 10.8019291;
  lng = 106.6460084;
  zoom = 20;
  canEdit = false;

  private sub: any;
  private id: string;
  match: any = {};
  reviews: Array<any> = [];
  userReview: any;
  venue: any;
  data: any = {};
  user: any;
  limit = false;
  status: string;
  loading = true;
  canReview = false;
  userJoined: any = {};
  typeLabel = 'người';
  map: any;
  review: any = {
    comment: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private dialog: MdDialog,
    private userService: UserService,
    private _commonService: CommonService,
    private matchService: MatchService) {}

  initMap() {
    let mapDiv = document.getElementById('game-map');
    let lat = Number(this.venue.latitude),
        lng = Number(this.venue.longitude);
    let latlng = new google.maps.LatLng(lat, lng);

    let options = {
        scrollwheel: false,
        scaleControl: false,
        // draggable: false,
        center: latlng,
        zoom: 17,
        MapTypeId: google.maps.MapTypeId.TERRAIN,
    };
    this.map = new google.maps.Map(mapDiv, options);
    let marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      title: this.venue.name
    });
  }

  onEditMatch(id: string) {
    this.router.navigate(['edit-game', id]);
  }

  goBack() {
    this.router.navigate(['games']);
  }

  selectUser(userid: string) {
    this.router.navigate(['user', userid]);
  }

  swap(array: any, fromIndex: any, toIndex: any){
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
  }

  moveHostToTop() {
    let fromIndex = _.findIndex(this.match.participantsList, (part: any) => {
      return part.id === this.match.hostId;
    });

    if (fromIndex > 0) {
      this.swap(this.match.participantsList, fromIndex, 0);
    }
  }

  openVerify() {
    let dialogRef = this.dialog.open(OtpComponent);
    dialogRef.componentInstance.from = 'game';
    dialogRef.componentInstance.callback = 'resendOtp';

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.joinGame();
      }
    });
  }

  openLogin() {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.joinGame();
      }
    });
  }

  confirmOtp() {
    this.alertService.confirm({
      subType: 'green',
      content: 'Tài khoản của bạn chưa được kích hoạt, bạn có muốn nhận tin nhắn để kích hoạt ?'
    }, this.openVerify.bind(this));
  }

  getMatch(id: string) {
    this.matchService.getMatch(id)
    .subscribe(
      (res: any) => {
        this.match = res.data;
        this._init();

        setTimeout(() => {
          this.loading = false;
          this.initTimer();
        }, 500);
      });
  }

  _init() {
    this.reviews = this.match.reviewsList;
    this.limit = this.match.maxParticipants > 0;
    this.getInfo();

    if (this.user && this.user.id) {
      this.checkCanReview();
      this.getUserReview();
    }
    this.checkCanEdit();
    this.moveHostToTop();
    this.typeLabel = this.match.typeOfJoin === 1 ? 'người' : 'đội';
  }

  checkCanEdit() {
    if (this.user && this.match) {
      this.canEdit = this.user.id === this.match.hostId;
    }
  }

  checkCanReview() {
    let me = this;
    this.userJoined = ( _.find(this.match.participantsList, (item: any) => {
      return item.id === me.user.id;
    }));
    this.canReview = !!this.userJoined;
  }

  getUserReview() {
    let me = this;
    this.userReview = _.find(this.reviews, (rv: any) => {
      return rv.userId === me.user.id;
    });

    if (this.userReview) {
      this.review.rating = this.userReview.matchRating;
    }
  }

  getVenue(id: string) {
    this.venue = _.find(this.info.venues, (item: any) => {
      return item.id === id;
    });
    this.initMap();
  }

  reviewSelect(rating: number) {
    if (this.userReview) {
      return;
    }
    this.review.rating = rating;
  }

  reviewComment() {
    if (!this.review.rating) {
      this.alertService.alert({
        content: 'Bạn cần chọn sao để đánh giá !'
      }, null);
      return;
    }
    this.reviewGame();
  }

  reviewGame() {
    this.review.userId = this.user.id;
    this.review.matchId = this.match.id;
    this.matchService.reviewGame(this.review)
    .subscribe(
      (res: any) => {
        this.review.comment = '';
        this.alertService.alert({
          content: 'Cảm ơn, bình luận của bạn đã được gởi!'
        }, null);
        this.reviews = res.data;
      });
  }

  initTimer() {
    let str: string = moment(this.match.startDate).format('YYYY/MM/DD');
    str += ' ' + this.match.startTime + ':00';
    $('#time-left').countdown(str, (event: any) => {
      let val = event.strftime('%D ngày %H giờ %M phút %S giây');
        $('#time-left').text(val);
    });
  }

  joinGame() {

    let message = '';
    if (!this.user) {
      message = 'Bạn cần đăng nhập để tham gia trận đấu!';
      this.alertService.alert({
        content: message
      }, this.openLogin.bind(this));
      return;
    }

    if (!message && (!this.data.companies || this.data.companies < 0)) {
      message = 'Số ' + this.typeLabel + ' tham gia tối thiểu là 1.';
    }

    let maxCompare = this.data.companies + this.match.currentParticipants;
    if (this.canReview) {
      maxCompare -= this.userJoined.companies;
    }

    if (!message && this.limit && (this.match.maxParticipants < maxCompare)) {
      message = 'Số ' + this.typeLabel + ' tham gia vượt quá số chỗ hiện tại.';
    }

    if (message) {
      this.alertService.alert({
        content: message
      }, null);
      return;
    }

    if (!this.user.mobileVerified) {
      this.confirmOtp();
      return;
    }

    this.data.userId = this.user.id;
    this.data.matchId = this.match.id;
    this.data.joinType = 1;
    this.data.canReview = this.canReview;

    this.matchService.joinGame(this.data)
    .subscribe(
      (res: any) => {

        if (res.code === 200) {
          this.data.companies = null;
          this.status = 'Đã tham gia';
          let message = 'Bạn đã đăng ký tham gia thành công, xin cảm ơn!';
          if (this.canReview) {
            message = 'Bạn đã cập nhật thành công, xin cảm ơn!';
          }
          this.alertService.alert({
            content: message
          }, null);
          this.match = res.data;
          this._init();
        }
      });
  }

  confirm() {
    this.alertService.confirm({
      content: 'Bạn có chắc muốn hủy tham gia ?'
    }, this.cancelGame.bind(this));
  }

  cancelGame() {
    this.data.userId = this.user.id;
    this.data.matchId = this.match.id;

    this.matchService.cancelGame(this.data)
    .subscribe(
      (res: any) => {
        this.match = res.data;
        this._init();
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['gameid'];
       this.getMatch(this.id);
    });

    this.getUser();

    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.checkCanEdit();
      }
    });
    this.checkCanEdit();
  }

  getUser() {
    let user = localStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getInfo() {
    // general info
    this._commonService.getInfo()
    .subscribe(
       (res: any) => {
         this.info = res.data;
         if (!this.venue) {
           this.getVenue(this.match.venueId);
         }
       }
     );
    /* end general info*/
  }

  ngAfterViewInit() {

  }
}
