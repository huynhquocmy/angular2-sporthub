import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { AppConstants } from '../app.constants';
import { HttpService } from '../_services/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class YourgamesService {
    private url = AppConstants.apiURI + 'matches';
    constructor (private http: HttpService) {}

    getMatches(filterString: string) {
        return this.http.get(this.url + filterString)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return error;
            });
    }
}
