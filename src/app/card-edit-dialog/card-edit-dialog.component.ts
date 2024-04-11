import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardNPropetiesPackages } from '../model/card-npropeties-packages.model';
import { ChCardRequest } from '../model/ch-card-request.model';
import { Card } from '../model/card.model';

@Component({
  selector: 'app-card-edit-dialog',
  templateUrl: './card-edit-dialog.component.html',
  styleUrls: ['./card-edit-dialog.component.css']
})
export class CardEditDialogComponent {
  @Output() changed = new EventEmitter<ChCardRequest>();
  @Output() cancelled = new EventEmitter<void>();
  title: string;
  message: string;
  value: CardNPropetiesPackages;

  constructor(
    private dialogRef: MatDialogRef<CardEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: CardNPropetiesPackages }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ? data.value : new CardNPropetiesPackages();
  }

  onChanged(value: ChCardRequest) {
    this.changed.emit(value);
    this.dialogRef.close( {yes: true} );
  }

  onCancel() {
    this.dialogRef.close( { yes: false } );
  }
}
