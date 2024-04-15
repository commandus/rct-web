import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PackageBoxQtyComponent } from '../package-box-qty/package-box-qty.component';

@Component({
  selector: 'app-dialog-package-box-qty',
  templateUrl: './dialog-package-box-qty.component.html',
  styleUrls: ['./dialog-package-box-qty.component.css']
})
export class DialogPackageBoxQtyComponent implements OnInit {
  @ViewChild(PackageBoxQtyComponent) packageBoxQty!: PackageBoxQtyComponent;
  title: string;
  qty = 0;

  constructor(
    private dialogRef: MatDialogRef<DialogPackageBoxQtyComponent>,
    @Inject(MAT_DIALOG_DATA) data : { title: string, qty: number }
  ) {
    this.title = data.title;
    this.qty = data.qty;
  }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close({yes: true, box_id: this.packageBoxQty.box_id, qty: this.packageBoxQty.qty});
  }

  cancel() {
    this.dialogRef.close({yes: false});
}

}
