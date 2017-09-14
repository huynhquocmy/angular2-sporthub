
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myTimerange' })

export class TimeRangePipe implements PipeTransform {
  transform(time: string, duration: number) {
    if (!time) {
      return '';
    }

    let hours = time.split(':')[0],
      mins = time.split(':')[1],
      durHours = parseInt('' + duration, 0),
      gap = duration - durHours;

    let endHours = Number(hours) + durHours,
      endMins = Number(mins);

  if (gap > 0) {
      endMins = 30 + Number(mins);
      if (endMins >= 60) {
        endMins = endMins - 60;
        endHours = endHours + 1;
      }
    }

  let displayHours = endHours.toString(),
    displayMins = endMins.toString();

    if (endHours < 10) {
      displayHours = '0' + endHours;
    }
    if (endMins === 0) {
      displayMins = '0' + displayMins;
    }

    return hours + 'h' + mins + ' - ' + displayHours + 'h' + displayMins;
  }
}
