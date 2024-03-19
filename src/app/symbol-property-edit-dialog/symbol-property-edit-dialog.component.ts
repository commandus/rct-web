import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SymbolProperty } from '../model/symbol-property.model';

@Component({
  selector: 'app-symbol-property-edit-dialog',
  templateUrl: './symbol-property-edit-dialog.component.html',
  styleUrls: ['./symbol-property-edit-dialog.component.css']
})
export class SymbolPropertyEditDialogComponent {
  @Output() cancelled = new EventEmitter<void>();
  @Output() changed = new EventEmitter<SymbolProperty>();
  title: string;
  message: string;
  value: SymbolProperty;

  constructor(
    private dialogRef: MatDialogRef<SymbolPropertyEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: SymbolProperty }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ? data.value : new SymbolProperty();
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
