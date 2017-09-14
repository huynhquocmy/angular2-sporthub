import { Component } from '@angular/core';
import { RequestService } from './request.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})

export class RequestComponent {
  model: any = {};
  error: number;
  verified = false;
  loading = false;

  constructor (
    private router: Router,
    private userService: UserService,
    private requestService: RequestService) {}

  verifyInfo() {
    this.error = 0;
    if (!this.model.custom) {
      return;
    }
    this.requestService.verifyInfo(this.model.custom)
    .subscribe(
      (user: any) => {
        if (user.code === 200) {
          this.verified = true;
        } else {
          this.error = 2000;
        }
      }
    );
  }

  changePassword() {
    this.error = 0;
    if (!this.model.otp || !this.model.password || !this.model.passwordAgain) {
      this.error = 102;
      return;
    }

    if (this.model.otp.length !== 6) {
      this.error = 100;
      return;
    }
    if (this.model.password !== this.model.passwordAgain) {
      this.error = 101;
      return;
    }

    this.requestService.changePassword(this.model)
    .subscribe(
      (res: any) => {
        if (res.code === 200) {
          this.userService.setUser(res.data);
          this.router.navigate(['/games']);
        }
    });
  }

  close() {
  }
}
