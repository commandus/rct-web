import { Pipe, PipeTransform } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Card } from './model/card.model';
import { Symbol } from './model/symbol.model';

@Pipe({
  name: 'nominal'
})

export class CardNominalPipe implements PipeTransform {
  transform(value: Card): string {
    if (value.nominal == '0')
      return '';
    else {
      const vv: number = +value.symbol_id;
      const symbol = String.fromCharCode(vv + 0x40);
      return Symbol.nominal2string(symbol, value.nominal);
    } 
  }
}