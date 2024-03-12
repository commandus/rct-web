import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Symbol } from '../model/symbol.model';

@Component({
  selector: 'app-prefix-measure-list',
  templateUrl: './prefix-measure-list.html',
  styleUrls: ['./prefix-measure-list.css']
})
export class PrefixMeasureListComponent {
  @Input() @Output() symbol_id: number = 0;
  @Output() prefixSelected = new EventEmitter<string>();
  
  public hasUnit() : boolean
  {
    return Symbol.componentUnitName(this.symbol_id).length > 0;
  }

  public prefixes() : string[] 
  {
    const u = Symbol.componentUnitName(this.symbol_id);
    return Symbol.componentPrefix(this.symbol_id);
  }

  constructor() { 
  }

  public onSelectionChanged(event: MatSelectChange) {
    this.prefixSelected.emit(event.value);
  }

}
