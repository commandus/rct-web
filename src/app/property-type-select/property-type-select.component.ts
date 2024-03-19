import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WebappService } from '../webapp.service';
import { MatSelectChange } from '@angular/material/select';
import { PropertyType } from '../model/property-type.model';

@Component({
  selector: 'app-property-type-select',
  templateUrl: './property-type-select.component.html',
  styleUrls: ['./property-type-select.component.css']
})
export class PropertyTypeSelectComponent {
  @Input() id: number = 0;
  @Input() key = '';
  @Input() @Output() value: PropertyType = new PropertyType;
  @Output() propertyTypeSelected = new EventEmitter<PropertyType>();
  
  public selectedPropertyType: PropertyType = new PropertyType;

  constructor(public svc: WebappService) { 
  }

  public onSelectionChanged(event: MatSelectChange) {
    this.value.id = this.selectedPropertyType.id;
    this.propertyTypeSelected.emit(this.selectedPropertyType);
  }

  ngOnInit(): void {
    if (this.key && this.key.length > 0) {
      this.selectedPropertyType = this.svc.getPropertyTypeByKey(this.key);
    } else {
      if (this.id) {
        this.selectedPropertyType = this.svc.getPropertyTypeById(this.id);
      } else {
        if (this.value) {
          this.selectedPropertyType = this.value;
        }
      }
    }
  }

}
