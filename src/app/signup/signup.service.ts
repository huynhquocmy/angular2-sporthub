import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../app.constants';
import { HttpService } from '../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import * as md5 from 'md5';

@Injectable()
export class SignupService {
  private signupUrl = AppConstants.apiURI + 'users';
  private otpUrl = AppConstants.apiURI + 'users/verify';

  constructor (private http: HttpService) {}

  signup(email: string, password: string, fullName: string, username: string, mobile: string) {
    // password = md5(password);
    mobile = mobile.replace(/ /g, '');
    let data = {
      email: email,
      username: username,
      password: password,
      fullName: fullName,
      mobile: mobile
    };

    let bodyString = JSON.stringify(data);

    return this.http.post(this.signupUrl, bodyString)
      .map((response: Response) => {
        let res = response.json();
        return res;
      });
  }

  verifyInfo(data: any) {
    let url = AppConstants.apiURI + 'users/checkexistence?';
    if (data.email) {
      url += 'email=' + data.email;
      if (data.mobile) {
        url += '&';
      }
    }
    if (data.mobile) {
      url += 'mobile=' + data.mobile;
    }

    return this.http.get(url)
      .map((response: Response) => {
        let res = response.json();
        return res;
      });
  }

  resendOtp(data: any) {
    let bodyString = JSON.stringify(data);
    let url = AppConstants.apiURI + 'otp';
    return this.http.post(url, bodyString)
      .map((response: Response) => {
        let res = response.json();
        return res;
      });
  }

  verify(otp: string) {
    // otp = md5(otp);
    let bodyString = JSON.stringify({
      "activationCode": otp
    });

    return this.http.put(this.otpUrl, bodyString)
      .map((response: Response) => {
        let user = response.json();
        return user;
      });
  }
}
