import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';

@Component({
  selector: 'app-query-component',
  templateUrl: './query-component.component.html',
  styleUrls: ['./query-component.component.css']
})
export class QueryComponentComponent {
  constructor(public svc: WebappService) { 
  }
}
