import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Package } from '../model/package.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Box } from '../model/box.model';

@Component({
  selector: 'app-box-qty',
  templateUrl: './box-qty.component.html',
  styleUrls: ['./box-qty.component.css']
})
export class BoxQtyComponent {
  
  @Input() @Output() value: Package = new Package;

  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    public svc: WebappService
  ) { 

  }

  ngOnInit(): void {
    if (!this.value)
      this.value = new Package;
    this.formGroup = this.formBuilder.group({
      boxPath: [this.value ? Box.box2string(this.value.box) : '',
        [ Validators.required ]
      ],
      qty: [this.value ? this.value.qty : 0,
        [ Validators.required ]
      ]
    });
   }

   onBoxChanged($event: any) {
    if (this.value.box_name == Box.box2string(this.value.box))
      this.value.box_name = this.formGroup.getRawValue().boxPath;
    this.value.box = Box.string2box(this.formGroup.getRawValue().boxPath);
   }

   onQtyChanged($event: any) {
    this.value.qty = this.formGroup.getRawValue().qty;
   }

}
