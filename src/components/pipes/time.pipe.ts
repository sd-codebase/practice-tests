import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (args[0] === 'fromSeconds') {
      const duration = moment.duration(value, 'seconds');
      const formatted = duration.format('hh:mm:ss');
      return formatted;
    }
    return '';
  }

}
