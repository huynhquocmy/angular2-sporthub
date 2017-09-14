import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { SignupComponent } from '../../signup/signup.component';
import { LoginComponent } from '../../login/login.component';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../_services/user.service';
import { AppConstants } from '../../app.constants';
import { LangService } from '../../_lang/lang.service';
declare var Headroom: any;

@Component({
  templateUrl: './header.component.html',
  selector: 'layout-header',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  user: Observable<any>;
  imgURI = AppConstants.imgURI;
  LANG: any = {};

  constructor(
    private userService: UserService,
    private dialog: MdDialog,
    private langService: LangService,
    private router: Router) {
    this.langService.getLang()
    .subscribe((res) => {
      this.LANG = res;
    });
  }

  openSignup() {
      this.dialog.open(SignupComponent);
  }

  openSignin() {
      let dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe(() => {
        let user = localStorage.getItem('user');
        this.user = JSON.parse(user);
      });
  }

  ngOnInit() {
    let user = localStorage.getItem('user');
    this.user = JSON.parse(user);
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngAfterViewInit() {
    // grab an element
    let myElement = document.querySelector("layout-header");
    // construct an instance of Headroom, passing the element
    let headroom  = new Headroom(myElement);
    // initialise
    headroom.init();
  }

  logout() {
    this.userService.setUser(null);
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/']);
  }
};
