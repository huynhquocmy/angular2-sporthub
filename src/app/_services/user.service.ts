import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable ()

export class UserService {

  private subject = new Subject<any>();

  user: any;
  constructor() {
  	let user: any = localStorage.getItem('user');
  	this.user = JSON.parse(user);
  }

  getUser(): Observable<any> {
  	if (this.user) {
  		this.next();
  	}
    return this.subject.asObservable();
  }

  next() {
    setTimeout(() => {
      this.subject.next(this.user);
    })
  }

  setUser(user: any) {
  	this.user = user;
  	localStorage.setItem('user', JSON.stringify(user));
    this.subject.next(user);
  }
}