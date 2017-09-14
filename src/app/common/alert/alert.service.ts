import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable ()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  alert(data: any, callback: any) {
    this.keepAfterNavigationChange = false;
    this.subject.next({ type: 'alert', data: data, callback: callback });
  }

  confirm(data: any, callback: any) {
    this.keepAfterNavigationChange = false;
    this.subject.next({ type: 'confirm', data: data, callback: callback });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}