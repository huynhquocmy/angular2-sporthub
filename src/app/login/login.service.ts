import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../app.constants';
import { HttpService } from '../_services/http.service';
// import * as md5 from 'md5';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private loginUrl = AppConstants.apiURI + 'tokens';
  constructor (private http: HttpService) {}

  login(custom: string, password: string) {
    custom = custom.replace(/ /g, '');

    let data: any = {};
    if (custom.indexOf('@') > -1) {
      data.email = custom;
    } else {
      data.mobile = custom;
    }

    // password = md5(password);

    data.password = password;
    return this.http.post(this.loginUrl, JSON.stringify(data))
      .map((response: Response) => {
        let user = response.json();
        if (user && user.data && user.data.token) {
          localStorage.setItem('user', JSON.stringify(user.data));
        }
        return user;
      });
      // .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
