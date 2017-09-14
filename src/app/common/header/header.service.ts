import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()

export class HeaderService {
  private subject = new Subject();
  keepAfterNavigationChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      // if (event instanceof NavigationStart) {
      //  let user = JSON.parse(localStorage.getItem('currentUser'));
      //  this.subject.next(user);
      // }

      if (event instanceof NavigationEnd) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.subject.next(user);
      }
    });
  }

  getLoggedUser(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.subject.next(user);
    return this.subject.asObservable();
  }
}
