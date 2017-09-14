import { Component } from '@angular/core';
import { AppConstants } from '../app.constants';
import { AfterViewInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
declare var _: any;
declare var moment: any;
import { CacheService } from '../_services/cache.service';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent {
  gameTypes: any;
  locations: any;
  days = Object.assign([], AppConstants.DAYSINWEEK);
  calendarOptions:Object = {};
  location: number;

  date: any;
  rangeStart: Date;
  matches: Array<any>;
  filters: any = {};

  constructor(private _commonService: CommonService, private _cacheService: CacheService) {}

  onSelectDays(obj: any) {
    this.date = null;
    obj.selected = !obj.selected;
    this.filterGames();
  }

  selectActive(obj: any) {
    obj.selected = !obj.selected;
    this.filterGames();
  }

  onSelectDate() {
    _.each(this.days, (day: any) => {
      day.selected = false;
    });
    this.filterGames();
  }

  filterGames() {
    setTimeout(() => {
      let date = null;
      if (this.date) {
        date = moment(this.date).format('YYYY-MM-DD');
      }
      this.filters = {
        originDate: this.date,
        days: this.days,
        gameTypes: this.gameTypes,
        location: this.location,
        date: date
      };
      this._cacheService.setState(this.filters);
    }, 10);
  }

  initData(res: any) {
    let filters = this._cacheService.getState();
    this.gameTypes = filters.gameTypes || res.data.gameTypes;

    _.remove(this.gameTypes, (type: any) => {
      return type.id < 0;
    });

    this.locations = res.data.locations;
    this.filters = filters;
    this.date = filters.originDate;
    this.location = filters.location;
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

  ngOnInit() {
    this.getInfo();
  }
}
