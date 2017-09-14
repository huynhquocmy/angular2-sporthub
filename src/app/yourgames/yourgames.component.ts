import { Component } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { UserService } from '../_services/user.service';
import { YourgamesService } from './yourgames.service';
import { Router } from '@angular/router';
import { LangService } from '../_lang/lang.service';

@Component({
  templateUrl: './yourgames.component.html',
  styleUrls: ['./yourgames.component.css']
})

export class YourgamesComponent {
  user: any;
  generalInfo: any;
  data: any = {};
  error = '';
  mode = 1;
  nextGame: any = {};
  loading = false;
  matches: Array<any> = [];
  joinedMatches: Array<any> = [];
  LANG: any = {};
  private filterString = '';

  constructor(
    private userService: UserService,
    private yourgamesService: YourgamesService,
    private router: Router,
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
        this.initInfo();
      }
    });
  }

  switchMode(mode: number) {
    this.mode = mode;
  }

  getInfo() {
    // general info
    this._commonService.getInfo()
    .subscribe(
       (res: any) => {
         this.generalInfo = res.data;
         if (!this.user) {
           this.getUser();
         }
       }
     );

    /* end general info*/
  }

  getMatches() {
    this.loading = true;
    this.yourgamesService.getMatches(this.filterString)
    .subscribe(
      (res: any) => {
        this.matches = res.data;
        this.nextGame = this.matches[0] || {};
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }

  getJonedMatches() {
    let filterString = '?joinedby=' + this.user.id;
    this.loading = true;
    this.yourgamesService.getMatches(filterString)
    .subscribe(
      (res: any) => {
        this.joinedMatches = res.data;
        this.nextGame = this.joinedMatches[0] || {};
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }

  onSelectMatch(id: string) {
    this.router.navigate(['game', id]);
  }

  onEditMatch(id: string) {
    this.router.navigate(['edit-game', id]);
  }

  getUser() {
    let user: any = localStorage.getItem('user');
    this.user = JSON.parse(user);

    if (this.user) {
      this.initInfo();
    }
  }

  initInfo() {
    this.filterString = '?uid=' + this.user.id;
    this.getMatches();
    this.getJonedMatches();
  }
}
