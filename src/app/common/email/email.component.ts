import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileAccountService } from '../../profile/account/account.service';
import { UserService } from '../../_services/user.service';
declare var $: any;
declare var _: any;

@Component({
  selector: 'email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent implements AfterViewInit {

  user: any = {};
  constructor(
    private router: Router,
    private userService: UserService,
    private profileAccountService: ProfileAccountService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = _.cloneDeep(user);

        setTimeout(() => {
          $('.email').addClass('animated slideInDown');
        }, 4000);
      }
    });
  }

  update() {
    if (!this.user.email) {
      return;
    }

    if (this.user.email.indexOf('@') < 0) {
      return;
    }
    this.profileAccountService.update(this.user)
    .subscribe((res: any) => {
      this.userService.setUser(this.user);
    });
    $('.email').addClass('animated slideOutUp');
    localStorage.setItem('emailed', 'true');
  }

  later() {
    $('.email').addClass('animated slideOutUp');
  }

  done() {
    localStorage.setItem('emailed', 'true');
    $('.email').addClass('animated slideOutUp');
  }

  ngAfterViewInit() {
  }
}
