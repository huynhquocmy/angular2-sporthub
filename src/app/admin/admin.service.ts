import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../app.constants';
import { HttpService } from '../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
    private url = AppConstants.apiURI + 'venues';
    constructor (private http: HttpService) {}

    save(data: any) {

      let bodyString = JSON.stringify(data);

      return this.http.post(this.url, bodyString)
        .map((response: Response) => {
          let res = response.json();
          return res;
        });
    }
}
