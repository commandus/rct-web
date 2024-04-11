import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-package-qty',
  templateUrl: './package-qty.component.html',
  styleUrls: ['./package-qty.component.css']
})
export class PackageQtyComponent {
  @Input() @Output() qty = 0;

  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      qty: [this.qty ? this.qty : 0,
        [ Validators.required ]
      ]
    });
  }

  onQtyChanged($event: any) {
    this.qty = this.formGroup.getRawValue().qty;
  }

}
