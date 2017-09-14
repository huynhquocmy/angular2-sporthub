import { Component } from '@angular/core';
import { AppConstants } from '../app.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { HostService } from './host.service';
import { AlertService } from '../common/alert/alert.service';
import { CommonService } from '../_services/common.service';
import { UserService } from '../_services/user.service';
import { MatchService } from '../games/game/game.service';
import { MdDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { OtpComponent } from '../signup/otp.component';
import { LangService } from '../_lang/lang.service';

declare var _: any;
declare var moment: any;

@Component({
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})

export class HostComponent implements AfterViewInit {
  user: any;
  step = 1;
  skills = AppConstants.SKILLS;
  priorities = AppConstants.PRIORITIES;
  closedhours = AppConstants.CLOSEDHOURS;
  hours = AppConstants.HOURS;
  times = AppConstants.CUTOFFTIME;
  duration = AppConstants.DURATION;

  gameTypes: any;
  locations: any;
  gameLevels: any;
  venues: any;
  generalInfo: any;
  typeLabel = 'người';

  joinTypes = [{
    id: 1,
    name: 'Tự do'
  }, {
    id: 2,
    name: 'Theo đội'
  }];

  data: any = {
    typeOfJoin: 1,
    gameLevelId: -1,
    gameTypeId: 1
  };
  loading: boolean;
  date: Date;
  rangeStart: Date;
  location = -1;

  isEdit = false;
  private sub: any;

  error = '';
  LANG: any = {
    "COMMON": {},
    "HOME": {}
  };

  constructor(
    private hostService: HostService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private userService: UserService,
    private matchService: MatchService,
    private langService: LangService,
    private _commonService: CommonService) {
    this.data.rangeStart = new Date();
    this.langService.getLang()
    .subscribe((res) => {
      this.LANG = res;
    });
  }

  ngOnInit() {
    this.getInfo();
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
    this.sub = this.route.params.subscribe(params => {
       let id = params['gameid'];
       if (id) {
         this.getMatch(id);
         this.isEdit = true;
       }
    });
  }

  openVerify() {
    let dialogRef = this.dialog.open(OtpComponent);
    dialogRef.componentInstance.from = 'game';
    dialogRef.componentInstance.callback = 'resendOtp';

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.hostGame();
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
        this.data = res.data;
        this.step = 3;
        this.data.startDateDisplay = new Date(this.data.startDate);
        this.changeJoinType();
    });
  }

  next() {
    if (!this.data.gameTypeId || !this.data.venueId 
      || !this.data.startDateDisplay || !this.data.startTime || !this.data.duration
      || !this.data.payPerPlayer || !this.data.cutoffTime) {
      this.error = 'Vui lòng nhập đầy đủ thông tin bắt buộc ở trên (*).';
      return;
    }

    if (this.step === 1 && (this.data.minParticipants > this.data.maxParticipants)) {
      this.error = 'Số người tối thiểu không được lớn hơn số người tối đa.';
      return;
    }

    this.error = '';
    this.step++;
  }

  loadVenues() {
    if (!this.location || this.location < 0) {
      this.venues = this.generalInfo.venues;
    } else {
      let venues = _.filter(this.generalInfo.venues, (venue: any) => {
        return venue.location && venue.location.id === this.location;
      });

      this.venues = venues;
    }
  }

  changeJoinType() {
    this.typeLabel = this.data.typeOfJoin === 1 ? 'người' : 'đội';
  }

  initData(res: any) {
    this.generalInfo = res.data;
    this.gameTypes = _.filter(res.data.gameTypes, (t: any) => {
      return t.id > 0;
    });
    this.locations = res.data.locations;
    this.gameLevels = res.data.gameLevels;
    this.venues = _.filter(res.data.venues, (t: any) => {
      return t.id > 0;
    });
  }

  getInfo() {
    // general info
    this._commonService.getInfo()
    .subscribe(
       (res: any) => {
        this.initData(res);
       }
     );
    /* end general info*/
  }

  openLogin() {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.hostGame();
      }
    });
  }

  hostGame() {
    this.getUser();

    // Alert if no logged user
    if (!this.user) {
      this.alertService.alert({
        content: 'Bạn cần đăng nhập để tổ chức trận đấu!'
      }, this.openLogin.bind(this));
      return;
    }

    // alert if required data invalid
    if (!this.data.gameTypeId || !this.data.venueId
      || !this.data.startDateDisplay || !this.data.cutoffTime) {
      this.error = 'Vui lòng nhập đầy đủ thông tin bắt buộc ở trên (*).';
      return;
    }

    if (this.data.minParticipants > this.data.maxParticipants) {
      this.error = 'Số người tối thiểu không vượt quá số người tối đa.';
      return;
    }

    if (0 > this.data.payPerPlayer) {
      this.error = 'Số tiền phải lớn hơn hoặc bằng 0.';
      return;
    }

    if (1 > this.data.maxParticipants) {
      this.error = 'Số người tối đa phải lớn hơn 0.';
      return;
    }

    if (1 > this.data.minParticipants) {
      this.error = 'Số người tối thiểu phải lớn hơn 0.';
      return;
    }

    if (0 > this.data.initParticipants) {
      this.error = 'Số người hiện tại phải lớn hơn hoặc bằng 0.';
      return;
    }

    if (!this.user.mobileVerified) {
      this.confirmOtp();
      return;
    }

    this.error = '';
    this.loading = true;
    this.data.startDate = moment(this.data.startDateDisplay).format('YYYY-MM-DD');

    let data: any = {
        'gameTypeId': this.data.gameTypeId,
        'sportId': 1,
        'venueId': this.data.venueId,
        'hostId': this.user.id,
        'startDate': this.data.startDate,
        'startTime': this.data.startTime,
        'duration': this.data.duration,
        'description': this.data.description,
        'typeOfJoin': this.data.typeOfJoin,
        'payPerPlayer': this.data.payPerPlayer,
        'maxParticipants': this.data.maxParticipants,
        'minParticipants': this.data.minParticipants,
        'gameLevelId': this.data.gameLevelId,
        'initParticipants': this.data.initParticipants || 1,
        'isAutoApproved': true,
        'autoCancel': this.data.autoCancel,
        'status': 1,
        'cutoffTime': this.data.cutoffTime,
        'isEdit': this.isEdit
    };

    if (this.isEdit) {
      data.id = this.data.id;
    }

    this.hostService.hostGame(data)
    .subscribe(
      (res: any) => {

        if (res.code === 200) {
          setTimeout(() => {
            this.loading = false;

            let message = this.isEdit ? 'Cảm ơn, bạn đã cập nhật thành công.'
              : 'Cảm ơn, bạn đã tạo trận đấu thành công.'

            this.alertService.alert({
              content: message
            }, null);
          }, 500);
          let id = this.isEdit ? this.data.id : res.data.id;
          this.router.navigate(['/game', id]);
        } else {
          this.error = res.msg;
          this.loading = false;
        }
      },
      () => {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    );
  }

  confirm() {
    this.alertService.confirm({
      content: 'Bạn có chắc muốn hủy trận đấu này ?'
    }, this.cancelGame.bind(this));
  }

  cancelGame() {
    this.hostService.cancelGame({
      id: this.data.id
    })
    .subscribe(
      () => {
        this.alertService.alert({
          content: 'Bạn đã hủy trận đấu thành công.'
        }, null);
        this.router.navigate(['/your-games']);
      }
    );
  }

  getUser() {
    let user: any = localStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngAfterViewInit() {
    this.getUser();
  }
}
