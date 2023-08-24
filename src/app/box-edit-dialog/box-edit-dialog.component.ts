import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Box } from '../model/box.model';
import { ChBoxRequest } from '../model/ch-box-request.model';

@Component({
  selector: 'app-box-edit-dialog',
  templateUrl: './box-edit-dialog.component.html',
  styleUrls: ['./box-edit-dialog.component.css']
})
export class BoxEditDialogComponent {
  @Output() changed = new EventEmitter<ChBoxRequest>();
  @Output() cancelled = new EventEmitter<void>();
  title: string;
  message: string;
  value: Box;

  constructor(
    private dialogRef: MatDialogRef<BoxEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: Box }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ? data.value : new Box();
  }

  onChanged(value: ChBoxRequest) {
    this.changed.emit(value);
    this.dialogRef.close( {yes: true} );
  }

  onCancel() {
    this.cancelled.emit();
    this.dialogRef.close( { yes: false } );
  }

}
