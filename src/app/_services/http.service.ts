import { Http, Headers } from '@angular/http';
import {
    Injectable
} from '@angular/core';
import {
    RequestOptions
} from '@angular/http';
@Injectable()
export class HttpService {
    constructor(private http: Http) {}
    createAuthorizationHeader() {
        let user: any = localStorage.getItem('user');
        user = JSON.parse(user);
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain; charset=utf-8');
        if (user) {
            headers.append('UserId', user.id);
            headers.append('Authorization', 'Bearer ' + user.token);
        }
        let options = new RequestOptions({
            headers: headers
        });
        return options;
    }
    get(url: string) {
        let options = this.createAuthorizationHeader();
        return this.http.get(url, options);
    }
    post(url: string, data: any) {
        let options = this.createAuthorizationHeader();
        return this.http.post(url, data, options);
    }
    put(url: string, data: any) {
        let options = this.createAuthorizationHeader();
        return this.http.put(url, data, options);
    }
    remove(url: string, data: any) {
        let options = this.createAuthorizationHeader();
        options.body = data;
        return this.http.delete(url, options);
    }
}
