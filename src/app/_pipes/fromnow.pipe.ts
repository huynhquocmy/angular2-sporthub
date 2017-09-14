declare var moment: any;
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myFromNow' })

export class FromNowPipe implements PipeTransform {
  constructor() {
  	moment.locale('vi');
  }
  transform(date: string) {
    return moment(date).fromNow();
  }
}
