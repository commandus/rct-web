import { Pipe, PipeTransform } from '@angular/core';
import { Operation } from './model/operation.model';

@Pipe({
  name: 'operationname'
})

export class OperationPipe implements PipeTransform {
  transform(value: Operation): string {
    if (value.description && value.description.length)
      return value.description;
    else {
      switch (value.symbol) {
        case '+':
          return 'добавлено';
        case '-':
          return 'убавлено';
        case '=':
            return 'задано новое значение';
        case '/':
          return 'перемещено';
        default:
          return 'неизвестная операция';
        }
    } 
  }
}