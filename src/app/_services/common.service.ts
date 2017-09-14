import { Injectable }  from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Response }  from '@angular/http';
import { AppConstants } from '../app.constants';
import { HttpService } from '../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class CommonService {
  constructor(private http: HttpService) {}

  private getInfoUrl = AppConstants.apiURI + 'information';
  private subject = new Subject<any>();
  info: any;
  getInfo(): Observable<any> {
    if (this.info) {
      this.next();
    }
    return this.subject.asObservable();
  }

  next() {
    setTimeout(() => {
      this.subject.next(this.info);
    })
  }

  setInfo(info: any) {
    this.info = info;
    this.subject.next(info);
  }

  getGeneralInfo () {
    return this.http.get(this.getInfoUrl)
      .map((res: Response) => {
        let data = res.json();
        this.setInfo(data);
        return data;
      })
      .catch((error: any) => {
        return error;
      })
  }
}
