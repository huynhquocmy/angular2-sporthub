import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../../app.constants';
import { HttpService } from '../../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as md5 from 'md5';

@Injectable()
export class ProfileAccountService {
  private updateUrl = AppConstants.apiURI + 'users';
  constructor (private http: HttpService) {}

  update(user: any) {

    let data: any = {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      fullName: user.fullName,
      mobile: user.mobile
    };

    if (user.password && user.newPassword) {
      // let password = md5(user.password);
      // let newPassword = md5(user.newPassword);
      data.password = user.password;
      data.newPassword = user.newPassword;
    }

    let bodyString = JSON.stringify(data);
    let url = this.updateUrl + '/' + user.id;
    return this.http.put(url, bodyString)
      .map((response: Response) => {
        let _user = response.json();
        return _user;
      })
      .catch(error => {
        // return Observable.throw(error);
        return error;
      });
  }
}
