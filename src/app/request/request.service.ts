import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../app.constants';
import { HttpService } from '../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {
  private changePasswordUrl = AppConstants.apiURI + 'resetpwd';

  constructor (private http: HttpService) {}

  changePassword(req: any) {
    let data: any = {
      code: req.otp,
      password: req.password
    };

    if (req.custom.indexOf('@') > -1) {
      data.email = req.custom.replace(/ /g, '');
    } else {
      data.mobile = req.custom.replace(/ /g, '');
    }

    let bodyString = JSON.stringify(data);

    return this.http.put(this.changePasswordUrl, bodyString)
      .map((response: Response) => {
        let res = response.json();
        return res;
      });
  }

  verifyInfo(custom: string) {

    let url = AppConstants.apiURI + 'resetpwd',
        data: any = {};

    data.mobile = custom.replace(/ /g, '');
    let bodyString = JSON.stringify(data);

    return this.http.post(url, bodyString)
      .map((response: Response) => {
        let res = response.json();
        return res;
      });
  }
}
