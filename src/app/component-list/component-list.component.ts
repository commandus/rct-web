import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { WebappService } from '../webapp.service';
import { MatSelectChange } from '@angular/material/select';
import { Symbol } from '../model/symbol.model';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent {
  @Input() @Output() symbol_id: number = 0;
  @Input() @Output() symbol: Symbol = new Symbol;
  @Output() symbolSelected = new EventEmitter<Symbol>();
  
  selectedSymbol: Symbol = new Symbol;

  constructor(public svc: WebappService) { 
  }

  public onSelectionChanged(event: MatSelectChange) {
    this.symbol = this.selectedSymbol;
    this.symbol_id = this.selectedSymbol.id;
    this.symbolSelected.emit(this.selectedSymbol);
  }

  ngOnInit(): void {
    if (this.symbol_id) {
      this.selectedSymbol = this.svc.getComponentById(this.symbol_id);
    } else {
      if (this.symbol) {
        this.selectedSymbol = this.symbol;
      }
    }
  }

}
