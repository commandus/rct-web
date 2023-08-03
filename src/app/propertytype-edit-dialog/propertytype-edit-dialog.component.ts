import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertyType } from '../model/property-type.model';

@Component({
  selector: 'app-propertytype-edit-dialog',
  templateUrl: './propertytype-edit-dialog.component.html',
  styleUrls: ['./propertytype-edit-dialog.component.css']
})
export class PropertytypeEditDialogComponent {
  @Output() cancelled = new EventEmitter<void>();
  @Output() changed = new EventEmitter<PropertyType>();
  title: string;
  message: string;
  value: PropertyType;

  constructor(
    private dialogRef: MatDialogRef<PropertytypeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: PropertyType }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ? data.value : new PropertyType();
  }

  onCancel() {
    this.cancelled.emit();
    this.dialogRef.close( { yes: false } );
  }

  onChange() {
    this.changed.emit(this.value);
    this.dialogRef.close( { yes: false } );
  }

}
