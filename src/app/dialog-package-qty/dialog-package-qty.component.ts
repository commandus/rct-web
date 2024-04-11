import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PackageQtyComponent } from '../package-qty/package-qty.component';

@Component({
  selector: 'app-dialog-package-qty',
  templateUrl: './dialog-package-qty.component.html',
  styleUrls: ['./dialog-package-qty.component.css']
})
export class DialogPackageQtyComponent implements OnInit {
  @ViewChild(PackageQtyComponent) packageQty!: PackageQtyComponent;
  title: string;
  qty = 0;

  constructor(
    private dialogRef: MatDialogRef<DialogPackageQtyComponent>,
    @Inject(MAT_DIALOG_DATA) data : { title: string, qty: number }
  ) {
    this.title = data.title;
    this.qty = data.qty;
  }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close({yes: true, qty: this.packageQty.qty});
  }

  cancel() {
    this.dialogRef.close({yes: false});
}

}
