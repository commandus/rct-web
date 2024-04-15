import { Component, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoxAutocompleteComponent } from '../box-autocomplete/box-autocomplete.component';
import { Box } from '../model/box.model';

@Component({
  selector: 'app-package-box-qty',
  templateUrl: './package-box-qty.component.html',
  styleUrls: ['./package-box-qty.component.css']
})
export class PackageBoxQtyComponent {
  @ViewChild(BoxAutocompleteComponent) boxAutocomplete!: BoxAutocompleteComponent;
  @Input() @Output() qty = 0;
  @Input() @Output() box_id = 0n;

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

  public onBox(box: Box) : void {
    this.box_id = box.box_id;
  }
}
