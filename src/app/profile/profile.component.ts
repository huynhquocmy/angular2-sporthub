import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [  ]
})
export class ProfileComponent implements OnInit {
  user: any;
  loading = false;
  returnUrl: string;

  constructor () {
    let user = localStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngOnInit() {
  }
}
