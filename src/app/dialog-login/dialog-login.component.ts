import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user.model';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent {
  @Output() logged = new EventEmitter<User>();
  @Output() cancelled = new EventEmitter<void>();
  title: string;
  message: string;
  user: User;

  constructor(
    private dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, user?: User }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.user = data.user ? data.user : new User();
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
