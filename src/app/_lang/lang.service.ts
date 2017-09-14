import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { HttpService } from '../_services/http.service';

@Injectable ()

export class LangService {

  private subject = new Subject<any>();

  langObj: any;
  langMode: string = "vn";

  constructor(private http: HttpService) {
    this.langMode = localStorage.getItem('langMode') || 'vn';
    this.getJson()
    .subscribe(
      (res: any) => {
        this.langObj = res;
        this.langObj[this.langMode].langMode = this.langMode;
        this.subject.next(this.langObj[this.langMode]);
      });
  }

  getJson(): Observable<any> {
    return this.http.get('./src/app/_lang/lang.json')
      .map((res: any) => {
        const js = res.json();
        return js;
      })
      .catch((error: any) => {
        console.log(error);
        return error;
      });
  }

  getLang(): Observable<any> {
    if (this.langObj) {
      this.next();
    }
    return this.subject.asObservable();
  }

  next() {
    setTimeout(() => {
      this.subject.next(this.langObj[this.langMode]);
    })
  }

  setLang(langMode: any) {
    this.langMode = langMode;
    localStorage.setItem('langMode', this.langMode);
    this.langObj[this.langMode].langMode = this.langMode;
    this.subject.next(this.langObj[langMode]);
  }
}
