import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { CommonService } from './_services/common.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './assets/scss/base/base.css',
    './assets/scss/base/buttons.css',
    './assets/scss/base/main.css'],
  template: `
  	<alert></alert>
    <backtop></backtop>
    <intro *ngIf="!introduced"></intro>
    <email *ngIf="!emailed && !user.email"></email>
    <layout-header></layout-header>
    <router-outlet></router-outlet>
    <layout-footer></layout-footer>
  `
})
export class AppComponent {
  introduced: string = localStorage.getItem('introduced');
  emailed: string = localStorage.getItem('emailed');
  user: any = {};

  constructor (
    private _commonService: CommonService,
    private userService: UserService
  ) {}

  getInfo() {
    this._commonService.getGeneralInfo()
    .subscribe (
      (res: any) => {
      }
    );
  }
  ngOnInit() {
    this.getInfo();
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
