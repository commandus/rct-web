import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Symbol } from '../model/symbol.model';

@Component({
  selector: 'app-symbol-edit-dialog',
  templateUrl: './symbol-edit-dialog.component.html',
  styleUrls: ['./symbol-edit-dialog.component.css']
})
export class SymbolEditDialogComponent {
  @Output() cancelled = new EventEmitter<void>();
  title: string;
  message: string;
  value: Symbol;

  constructor(
    private dialogRef: MatDialogRef<SymbolEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: Symbol }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ? data.value : new Symbol();
  }

  onCancel() {
    this.cancelled.emit();
    this.dialogRef.close( { yes: false } );
  }

}
