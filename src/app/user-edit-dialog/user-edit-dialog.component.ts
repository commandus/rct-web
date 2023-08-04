import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {
  @Output() cancelled = new EventEmitter<void>();
  @Output() changed = new EventEmitter<User>();
  title: string;
  message: string;
  value: User;

  constructor(
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: User }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ? data.value : new User();
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
