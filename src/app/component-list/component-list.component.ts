import { Component, EventEmitter, Output } from '@angular/core';
import { RcrJsonService } from '../rcr-json.service';
import { WebappService } from '../webapp.service';
import { MatSelectChange } from '@angular/material/select';
import { Symbol } from '../symbol.model';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent {
  @Output() symbolSelected = new EventEmitter<Symbol>();
  
  constructor(public svc: WebappService) { 
  }

  public onSelectionChanged(event: MatSelectChange, symbol: Symbol) {
    this.symbolSelected.emit(symbol);
  }

}
