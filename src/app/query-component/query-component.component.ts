import { Component, EventEmitter, Output } from '@angular/core';
import { WebappService } from '../webapp.service';

@Component({
  selector: 'app-query-component',
  templateUrl: './query-component.component.html',
  styleUrls: ['./query-component.component.css']
})
export class QueryComponentComponent {
  @Output() queryChanged = new EventEmitter<string>();
  constructor(public svc: WebappService) { 
  }

  public onChanged(event: Event, query: string) {
    this.queryChanged.emit(query);
  }

}
