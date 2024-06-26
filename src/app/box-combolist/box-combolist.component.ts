import { Component, EventEmitter, Output } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Box } from '../model/box.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-box-combolist',
  templateUrl: './box-combolist.component.html',
  styleUrls: ['./box-combolist.component.css']
})
export class BoxCombolistComponent {
  @Output() boxSelected = new EventEmitter<Box>();
  
  public selectedBox: Box = new Box;

  constructor(public svc: WebappService) { 

  }

  public onSelectionChanged(event: MatSelectChange, box: Box) {
    this.boxSelected.emit(this.selectedBox);
  }

  public setBoxId(v: bigint) : void {
    this.selectedBox = this.svc.getBoxById(v);
  }
}
