import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../../app.constants';
import { HttpService } from '../../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchService {

  constructor (private http: HttpService) {}

  getMatch(id: string) {
    let url = AppConstants.apiURI + 'matches/' + id;

    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);

    if (user) {
      url += '?uid=' + user.id;
    }
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return error;
      });
  }

  getVenue(id: string) {
    let url = AppConstants.apiURI + 'venues/' + id;
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return error;
      });
  }

  joinGame(data: any) {
    let url = AppConstants.apiURI + 'matches/requests',
    method = data.canReview ? 'put' : 'post';
    let bodyString = JSON.stringify(data);
    return this.http[method](url, bodyString)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return error;
      });
  }

  cancelGame(data: any) {
    let url = AppConstants.apiURI + 'matches/requests';
    let bodyString = JSON.stringify(data);
    return this.http.remove(url, bodyString)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return error;
      });
  }

  reviewGame(data: any) {
    let url = AppConstants.apiURI + 'matches/review';
    let bodyString = JSON.stringify(data);
    return this.http.put(url, bodyString)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return error;
      });
  }

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
