import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppConstants } from '../app.constants';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable ()

export class UploadService {
  private uploadUrl = AppConstants.apiURI + 'images';
  constructor(private http: Http) {}

  upload(file: File) {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    let formData: FormData = new FormData();

    // formData.append('key', 'image');
    formData.append('image', file);
    let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', 'Bearer ' + user.token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.uploadUrl, formData, options)
            .map(res => {
              return res.json();
            })
            .catch(error => {
              return error;
            });
  }
}
