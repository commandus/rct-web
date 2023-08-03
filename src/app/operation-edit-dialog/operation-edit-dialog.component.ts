import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Operation } from '../model/operation.model';

@Component({
  selector: 'app-operation-edit-dialog',
  templateUrl: './operation-edit-dialog.component.html',
  styleUrls: ['./operation-edit-dialog.component.css']
})
export class OperationEditDialogComponent {
  @Output() cancelled = new EventEmitter<void>();
  title: string;
  message: string;
  value: Operation;

  constructor(
    private dialogRef: MatDialogRef<OperationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: Operation }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ? data.value : new Operation();
  }

  onCancel() {
    this.cancelled.emit();
    this.dialogRef.close( { yes: false } );
  }

}
