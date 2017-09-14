import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../../app.constants';
import { HttpService } from '../../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserCommentsService {

  constructor (private http: HttpService) {}

  updateComments(data: any) {
    let url = AppConstants.apiURI + 'matches/comments';
    let bodyString = JSON.stringify(data);
    return this.http.put(url, bodyString)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return error;
      });
  }
}
