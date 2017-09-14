import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AlertService } from '../common/alert/alert.service';
import { SignupService } from './signup.service';
import { UserService } from '../_services/user.service';

@Component({
  templateUrl: './otp.component.html',
  styleUrls: ['./signup.component.css']
})

export class OtpComponent {
  error: number;
  loading = false;
  from = '';
  callback: any;
  user: any;
  resent = false;
  otp = '';
  constructor (
    private userService: UserService,
    private dialogRef: MdDialogRef<any>,
    private signupService: SignupService,
    private alertService: AlertService) {}

  ngAfterViewInit() {
    if (this.callback) {
      this[this.callback]();
    }
  }

  verify() {
    this.error = null;
    if (!this.otp || this.otp.length !== 6) {
      this.error = 100;
      return;
    }

    this.getUser();

    this.signupService.verify(this.otp)
      .subscribe(
        res => {
          if (res.code === 200) {
            this.dialogRef.close(true);
            this.user.mobileVerified = true;
            this.userService.setUser(this.user);

            if (!this.from) {
              this.alertService.alert({
                content: 'Xác nhận thành công, xin cảm ơn!'
              }, null);
            }

          } else {
            this.error = res.code;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  resendOtp() {
    this.getUser();
    this.signupService.resendOtp({
      userId: this.user.id
    })
      .subscribe(
        res => {
          this.resent = true;
          if (res.code === 200) {
            console.log(res);
          } else {
            this.error = res.msg;
          }
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

  getUser() {
    let user = localStorage.getItem('user');
    this.user = JSON.parse(user);
  }
}
