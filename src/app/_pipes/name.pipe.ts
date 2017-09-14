
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myName' })

export class NamePipe implements PipeTransform {
  transform(name: string) {
    let splits = name.split(' ');
    let text = '';
    for (var i = 0; i < splits.length; i++) {
      var first = splits[i][0];
      text += first.toUpperCase();
    }
    return text;
  }
}
