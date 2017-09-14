import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LoginService } from './login.service';
import { AlertService } from '../common/alert/alert.service';
import { UserService } from '../_services/user.service';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error: string;

  constructor (
    private loginService: LoginService,
    private userService: UserService,
    private dialogRef: MdDialogRef<any>,
    private dialog: MdDialog,
    private router: Router,
    private alertService: AlertService) {}

  close() {
    this.dialogRef.close();
  }

  openSignup() {
    this.close();
    this.dialog.open(SignupComponent);
  }

  openRequest () {
    this.close();
    this.router.navigate(['/request']);
  }

  login() {
    this.error = '';

    if (!this.model.custom || !this.model.password) {
      this.error = 'Email (hoặc phone) và password là bắt buộc.';
      return;
    }

    this.loginService.login(this.model.custom, this.model.password)
      .subscribe(
        user => {
          if (user.code === 200) {
            this.userService.setUser(user.data);
            this.dialogRef.close(true);
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
  ngOnInit() {
    this.loginService.logout();
  }
}
