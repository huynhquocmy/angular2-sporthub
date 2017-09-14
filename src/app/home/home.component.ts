import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app.constants';
import { CommonService } from '../_services/common.service';
import { CacheService } from '../_services/cache.service';
import { HomeService } from './home.service';
import { UserService } from '../_services/user.service';
import { LangService } from '../_lang/lang.service';

declare var _: any;
declare var moment: any;
declare var $: any;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {
  gameTypes: any;
  game: any;
  days = Object.assign([], AppConstants.DAYSINWEEK);
  location: any;
  locations: any;
  date: Date;
  rangeStart: Date;
  matches: any;
  user: any;
  nextGame: any;
  LANG: any = {};

  constructor(
    private _commonService: CommonService,
    private _cacheService: CacheService,
    private userService: UserService,
    private homeService: HomeService,
    private langService: LangService,
    private router: Router) {
    this.langService.getLang()
    .subscribe((res) => {
      this.LANG = res;
    });
  }

  ngOnInit() {
    let user: any = localStorage.getItem('user');
    this.user = JSON.parse(user);

    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.getJonedMatches();
      } else {
        this.nextGame = null;
      }
    });

    if (this.user) {
      this.getJonedMatches();
    }
  }

  getInfo() {
    // general info
    this._commonService.getInfo()
    .subscribe(
       (res: any) => {
         this.gameTypes = res.data.gameTypes;
         this.locations = res.data.locations;
       }
     );
    /* end general info*/
  }

  getJonedMatches() {
    let filterString = '?upcoming=1&joinedby=' + this.user.id;
    this.homeService.getMatches(filterString)
    .subscribe(
      (res: any) => {
        this.nextGame = res.data[0] || {};
      });
  }

  onSelectMatch() {
    this.router.navigate(['game', this.nextGame.id]);
  }

  filterGames() {
    let date = null;
    if (this.date) {
      date = moment(this.date).format('YYYY-MM-DD');
    }

    if (this.game) {
      _.each(this.gameTypes, (g: any) => {
        g.selected = g.id === this.game;
      });
    }

    _.each(this.days, (day: any) => {
      day.selected = false;
    });

    let filters = {
      days: this.days,
      originDate: this.date,
      gameTypes: this.gameTypes,
      location: this.location,
      date: date
    };
    this._cacheService.setState(filters);
    this.router.navigate(['/games']);
  }

  ngAfterViewInit() {
    let slideOptions = {
        // effect : 'fade',
        infinite: true,
        buttons: false,
        autoplay: {
            play: true,
            timeout: 4000
        },
        effect: 'slide',
        slides: {
            visible: 1,
            slide: 1,
        },
        pagination: {
            add: true
        }
    };
    (<any>$('.slides')).tosrus(slideOptions);
    (<any>$('.testimonials')).tosrus(slideOptions);


    this.getInfo();
  }
}
