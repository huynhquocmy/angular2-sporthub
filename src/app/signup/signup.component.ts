import { Component } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { AlertService } from '../common/alert/alert.service';
import { SignupService } from './signup.service';
import { OtpComponent } from './otp.component';
import { UserService } from '../_services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  model: any = {};
  error: any;
  loading = false;
  step: number = 1;

  constructor (
    private dialogRef: MdDialogRef<any>,
    private dialog: MdDialog,
    private signupService: SignupService,
    private userService: UserService,
    private alertService: AlertService) {}

  openLogin() {
    this.close();
    this.dialog.open(LoginComponent);
  }

  verifyInfo() {
    this.error = '';
    if (!this.model.mobile) {
      return;
    }
    this.signupService.verifyInfo(this.model)
    .subscribe(
      user => {
        if (user.code !== 200) {
          this.error = user.code;
        }
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  openVerify() {
    this.dialog.open(OtpComponent);
  }

  next() {
    if (this.error) {
      return;
    }
    if (!this.model.fullName || !this.model.mobile) {
      this.error = 2005;
      return;
    }
    this.signupService.verifyInfo(this.model)
    .subscribe(
      user => {
        if (user.code !== 200) {
          this.error = user.code;
        } else {
          this.step = 2;
        }
      }
    );
  }

  back() {
    this.error = null;
    this.model.email = '';
    this.step = 1;
  }

  signup() {
    // TODO
    var d = new Date();
    this.model.email = '';
    this.signupService.signup(this.model.email, this.model.password, this.model.fullName, this.model.username, this.model.mobile)
      .subscribe(
        user => {
          if (user.code === 200) {
            this.dialogRef.close(true);
            this.userService.setUser(user.data);
            this.openVerify();
          } else {
            this.error = user.code;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  close() {
    this.dialogRef.close();
  }
}
