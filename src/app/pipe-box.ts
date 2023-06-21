import { Pipe, PipeTransform } from '@angular/core';
import { Box } from './box.model';

@Pipe({
  name: 'box'
})

export class BoxPipe implements PipeTransform {
  transform(value: string): string {
    return Box.box2string(value);
  }
}