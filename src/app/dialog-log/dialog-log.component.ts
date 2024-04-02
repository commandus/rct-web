import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../model/user.model';
import { Package } from '../model/package.model';
import { Box } from '../model/box.model';

@Component({
  selector: 'app-dialog-log',
  templateUrl: './dialog-log.component.html',
  styleUrls: ['./dialog-log.component.css']
})
export class DialogLogComponent {
  @Output() logged = new EventEmitter<User>();
  @Output() cancelled = new EventEmitter<void>();
  title: string;
  message: string;
  card_id = 0;
  box = '';

  constructor(
    private dialogRef: MatDialogRef<DialogLogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value: Package }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.card_id = data.value.card_id ? data.value.card_id : 0;
    this.box = data.value.box;
  }

  onLogged(value: User) {
    this.logged.emit(value);
    if (value) {
      this.dialogRef.close( {yes: true} );
    }
  }

  onCancel() {
    this.cancelled.emit();
    this.dialogRef.close( { yes: false } );
  }

}
