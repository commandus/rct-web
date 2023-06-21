import { Component, ViewChild } from '@angular/core';
import { WebappService } from '../webapp.service';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-box-tree',
  templateUrl: './box-tree.component.html',
  styleUrls: ['./box-tree.component.css']
})
export class BoxTreeComponent {
  @ViewChild('boxlist') boxlist: MatSelectionList | undefined;

  constructor(public svc: WebappService) { 
    if (this.boxlist)
      this.boxlist.selectedOptions.select(0 as any);
    else
      console.error('boxlist bind error');
  }

}
