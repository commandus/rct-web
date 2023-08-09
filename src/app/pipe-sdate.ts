import { DatePipe } from '@angular/common';
import { LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sdate'
})

export class DateTimePipe implements PipeTransform {
  transform(value: string): string | null {
    const dt = new Date(Number(value) * 1000);
    const p = new DatePipe('en-US');
    if (p)
      return p.transform(dt, 'dd.MM.yyyy HH:mm');
    return 'неизвестно';
  }
}