import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../app.constants';

@Component({
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.css']
})
export class ProfileBankComponent implements OnInit {
  user: any;
  loading = false;
  banks = AppConstants.BANKS;
  returnUrl: string;
  model: any = {};

  constructor () {
    let user = localStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngOnInit() {
  }
}
