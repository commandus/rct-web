import { Component } from '@angular/core';
import { RcrJsonService } from '../rcr-json.service';
import { WebappService } from '../webapp.service';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent {

  constructor(public svc: WebappService) { 
  }
}
