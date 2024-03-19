import { Component, ViewChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebappService } from '../webapp.service';
import { SymbolProperty } from '../model/symbol-property.model';
import { ComponentListComponent } from '../component-list/component-list.component';
import { PropertyTypeSelectComponent } from '../property-type-select/property-type-select.component';


@Component({
  selector: 'app-symbol-property-edit',
  templateUrl: './symbol-property-edit.component.html',
  styleUrls: ['./symbol-property-edit.component.css']
})
export class SymbolPropertyEditComponent implements OnInit {
    @Input() value: SymbolProperty = new SymbolProperty;
    @Output() cancelled = new EventEmitter<void>();
    @Output() changed = new EventEmitter<SymbolProperty>();
    @ViewChild(ComponentListComponent) componentList!: ComponentListComponent;
    @ViewChild(PropertyTypeSelectComponent) propertyTypeSelect!: PropertyTypeSelectComponent;
    public progress = false;
    message = '';
    success: boolean;
  
    constructor(
      private env: WebappService
    ) {
      this.success = env.hasAccount();
    }
  
    ngOnInit(): void {
      this.initForm();
    }
  
    private initForm() {
      if (!this.value)
        this.value = new SymbolProperty();
     }
  
    cancel(): void {
      this.cancelled.emit();
    }
  
    save(): void {
      this.value.symbol_id = this.componentList.symbol_id;
      this.value.property_type_id = this.propertyTypeSelect.value.id;
      this.changed.emit(this.value);
    }
  
  }
  