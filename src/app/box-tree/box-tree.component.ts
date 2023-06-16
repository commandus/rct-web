import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Box } from '../box.model';

@Component({
  selector: 'app-box-tree',
  templateUrl: './box-tree.component.html',
  styleUrls: ['./box-tree.component.css']
})
export class BoxTreeComponent {
  constructor(public svc: WebappService) { 
  }

}
