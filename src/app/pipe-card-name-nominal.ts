import { Pipe, PipeTransform } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Card } from './model/card.model';
import { Symbol } from './model/symbol.model';

@Pipe({
  name: 'nameNominal'
})

export class CardNameNominalPipe implements PipeTransform {
  transform(value: Card): string {
    let n;
    if (value.name.length == 0) {
      const vv: number = +value.symbol_id;
      n = String.fromCharCode(vv + 0x40);
    } else {
      n = value.name;
    } 

    if (value.nominal == '0')
      return n;
    else {
      const vv: number = +value.symbol_id;
      const symbol = String.fromCharCode(vv + 0x40);
      return n + ' ' + Symbol.nominal2string(symbol, value.nominal);
    } 
  }
}