import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../app.constants';
import { HttpService } from '../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {
    
    constructor (private http: HttpService) {}

    getUser(id: string) {
        let accountUrl = AppConstants.apiURI + 'users/' + id;
        return this.http.get(accountUrl)
            .map(res => {
                return res.json();
            })
            .catch(error => {
                return error;
            })
    }

    reviewUser(data: any) {
        let url = AppConstants.apiURI + 'users/reviews';
        let bodyString = JSON.stringify(data);
        return this.http.post(url, bodyString)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return error;
            })
    }
}
