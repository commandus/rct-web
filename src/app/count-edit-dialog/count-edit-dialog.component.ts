import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardNPropetiesPackages } from '../model/card-npropeties-packages.model';
import { ChCardRequest } from '../model/ch-card-request.model';

@Component({
  selector: 'app-count-edit-dialog',
  templateUrl: './count-edit-dialog.component.html',
  styleUrls: ['./count-edit-dialog.component.css']
})
export class CountEditDialogComponent {
  @Output() changed = new EventEmitter<ChCardRequest>();
  @Output() cancelled = new EventEmitter<void>();
  value: CardNPropetiesPackages;

  constructor(
    private dialogRef: MatDialogRef<CountEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: CardNPropetiesPackages }
  ) {
    this.value = data.value ? data.value : new CardNPropetiesPackages();
  }

  onChanged(value: ChCardRequest) {
    this.changed.emit(value);
    this.dialogRef.close( {yes: true} );
  }

  onCancel() {
    this.cancelled.emit();
    this.dialogRef.close( { yes: false } );
  }

}
