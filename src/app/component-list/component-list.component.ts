import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { WebappService } from '../webapp.service';
import { MatSelectChange } from '@angular/material/select';
import { Symbol } from '../model/symbol.model';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnChanges {
  @Input() @Output() symbol_id: number = 0;
  @Input() @Output() symbol: Symbol = new Symbol;
  @Output() symbolSelected = new EventEmitter<Symbol>();
  
  public selectedSymbol: Symbol = new Symbol;

  constructor(public svc: WebappService) { 
  }

  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }


  public onSelectionChanged(event: MatSelectChange) {
    this.symbol = this.selectedSymbol;
    this.symbol_id = this.selectedSymbol.id;
    this.symbolSelected.emit(this.selectedSymbol);
  }

  ngOnInit(): void {
    this.update();
  }

  private update(): void {
    if (this.symbol_id) {
      this.selectedSymbol = this.svc.getComponentById(this.symbol_id);
    } else {
      if (this.symbol) {
        this.selectedSymbol = this.symbol;
      }
    }
  }

  public setSymbolId(v: number) : void {
    this.selectedSymbol = this.svc.getComponentById(v);
  }
}
