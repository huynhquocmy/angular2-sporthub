import { Injectable }              from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class CacheService {
  filters: any = {};
  info: any;
  getState() {
    return this.filters;
  }

  setState(filters: any) {
    this.filters = filters;
    return this.filters;
  }
}