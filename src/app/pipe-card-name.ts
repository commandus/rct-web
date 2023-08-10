import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './model/card.model';

@Pipe({
  name: 'componentName'
})

export class CardNamePipe implements PipeTransform {
  transform(value: Card): string {
    if (value.name.length == 0) {
      const vv: number = +value.symbol_id;
      return String.fromCharCode(vv + 0x40);
    } else {
      return value.name;
    } 
  }
}