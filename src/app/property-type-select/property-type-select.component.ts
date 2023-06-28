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
  @Input() @Output() propertyTypeId: number = 0;
  @Input() @Output() propertyType: PropertyType = new PropertyType;
  @Output() propertyTypeSelected = new EventEmitter<PropertyType>();
  
  selectedPropertyType: PropertyType = new PropertyType;

  constructor(public svc: WebappService) { 
  }

  public onSelectionChanged(event: MatSelectChange) {
    this.propertyType = this.propertyType;
    this.propertyTypeId = this.propertyType.id;
    this.propertyTypeSelected.emit(this.selectedPropertyType);
  }

  ngOnInit(): void {
    if (this.propertyTypeId) {
      this.selectedPropertyType = this.svc.getPropertyTypeById(this.propertyTypeId);
    } else {
      if (this.propertyType) {
        this.selectedPropertyType = this.propertyType;
      }
    }
  }

}
