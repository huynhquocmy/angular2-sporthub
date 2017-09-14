import { Component, Input, SimpleChange } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from './matches.service';
import { LangService } from '../../_lang/lang.service';

declare var _: any;
@Component({
  selector: 'matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})

export class MatchesComponent implements AfterViewInit {

  @Input() matches:Array<any>;
  @Input() filters: any;

  private filterString: string = '?upcoming=1';

  mates: Array<any> = [];
  loading = false;
  LANG: any = {
    "COMMON": {},
    "HOME": {}
  };

  constructor(private router: Router,
    private matchesService: MatchesService,
    private langService: LangService) {
    this.langService.getLang()
    .subscribe((res) => {
      this.LANG = res;
    });
  }

  getBitInArray(arr: Array<boolean>) {
    var x = 0;
    for (var i = arr.length; i >= 0; i--) {
      x = (x << 1) | (arr[i] == true ? 1 : 0);
    }
    return x;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.filterString = '?upcoming=1';
    if (changes.filters && changes.filters.currentValue && !_.isEmpty(changes.filters.currentValue)) {

      let filters = changes.filters.currentValue;
      // filter by date
      if (filters.date) {
        this.filterString += '&date=' + filters.date;
      }

      // filters by day in week
      if (filters.days) {
        let days = _.map(filters.days, (day: any) => {
          if (!day.selected) {
            day.selected = false;
          }
          return day.selected;
        });
        let dotw = this.getBitInArray(days);
        if (dotw) {
          this.filterString += '&dotw=' + dotw;
        }
      }

      // filter by game type
      let types = _.map(filters.gameTypes, (t: any) => {
        if (!t.selected) {
          t.selected = false;
        }
        return t.selected;
      });

      let gtid = this.getBitInArray(types);

      if (gtid) {
        this.filterString += '&gtid=' + gtid;
      }

      if (filters.location) {
        this.filterString += '&lid=' + filters.location;
      }
      this.getMatches();
    }
  }

  // @Input()
  // set filters(filters: any) {
  //  console.log(filters);
  //     this.filters = filters;
  // }
  // get filters(): any {
  //    return this.filters;
  // }

  onSelect(id: string) {
    this.router.navigate(['/game', id]);
  }

  getMatches() {
    this.loading = true;
    this.matchesService.getMatches(this.filterString)
    .subscribe(
      (res: any) => {
        this.mates = res.data;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      })
  }

  ngAfterViewInit() {
    this.getMatches();
  }
}
