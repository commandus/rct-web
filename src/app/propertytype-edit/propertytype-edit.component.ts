import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { PropertyType } from '../model/property-type.model';

@Component({
  selector: 'app-propertytype-edit',
  templateUrl: './propertytype-edit.component.html',
  styleUrls: ['./propertytype-edit.component.css']
})
export class PropertytypeEditComponent implements OnInit {
  @Input() value: PropertyType = new PropertyType;
  @Output() cancelled = new EventEmitter<void>();
  @Output() changed = new EventEmitter<PropertyType>();
  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  message = '';
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private env: WebappService
  ) {
    this.success = env.hasAccount();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.value ? this.value.id : '', []
      ],
      key: [this.value ? this.value.key : '', []
      ],
      description: [this.value ? this.value.description : '', []
      ]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  save(): void {
    this.changed.emit(this.value);
  }

}
