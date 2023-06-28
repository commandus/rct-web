import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { PropertyWithName } from '../model/property-with-name.model';

@Component({
  selector: 'app-property-value',
  templateUrl: './property-value.component.html',
  styleUrls: ['./property-value.component.css']
})
export class PropertyValueComponent {
  @Input() @Output() value: PropertyWithName = new PropertyWithName;

  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    public svc: WebappService
  ) { 

  }

  ngOnInit(): void {
    if (!this.value)
      this.value = new PropertyWithName;
    this.formGroup = this.formBuilder.group({
      property_type: [this.value ? this.value.property_type : '',
        [ Validators.required ]
      ],
      value: [this.value ? this.value.value : '',
        [ Validators.required ]
      ]
    });
   }

   onPropertyChanged($event: any) {
    this.value.property_type = this.formGroup.getRawValue().property_type;
   }

   onValueChanged($event: any) {
    this.value.value = this.formGroup.getRawValue().value;
   }

}