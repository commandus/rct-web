import { Pipe, PipeTransform } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Pipe({
  name: 'qtyColor'
})

export class QtyColorPipe implements PipeTransform {
  transform(value: number): string {
    return  value < 100 ? "warn": "primary";
  }
}