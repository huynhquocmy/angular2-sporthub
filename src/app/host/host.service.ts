import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../app.constants';
import { HttpService } from '../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HostService {
  private url = AppConstants.apiURI + 'matches';
  constructor (private http: HttpService) {}

  hostGame(data: any) {
    let method = data.isEdit ? 'put' : 'post';
    let bodyString = JSON.stringify(data);
    return this.http[method](this.url, bodyString)
      .map((response: Response) => {
        let res = response.json();
        return res;
      })
      .catch((error: any) => {
        return error;
      });
  }

  cancelGame(data: any) {
    let url = this.url + '/' + data.id;
    let bodyString = JSON.stringify(data);
    return this.http.remove(url, bodyString)
      .map((response: Response) => {
        let res = response.json();
        return res;
      })
      .catch(error => {
        return error;
      });
  }
}
