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
          return 'добавление';
        case '-':
          return 'убавление';
        case '=':
          return 'присвоение';
        case '/':
          return 'перемещение';
        default:
          return 'неизвестное';
        }
    } 
  }
}