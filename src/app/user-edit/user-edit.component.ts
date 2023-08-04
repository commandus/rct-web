import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() value: User = new User;
  @Output() cancelled = new EventEmitter<void>();
  @Output() changed = new EventEmitter<User>();
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
    if (!this.value)
      this.value = new User();
    console.log(this.value);  
    this.formGroup = this.formBuilder.group({
      id: [this.value.id ? this.value.id : '', []
      ],
      name: [this.value.name, []
      ],
      password: [this.value.password, []
      ],
      rights: [this.value.rights ? this.value.rights : '', []
      ],
      token: [this.value.token ? this.value.token : '', []
      ]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  save(): void {
    this.value.name = this.formGroup.getRawValue().name;
    this.value.password = this.formGroup.getRawValue().password;
    this.value.rights = this.formGroup.getRawValue().rights;
    this.value.token = this.formGroup.getRawValue().token;
    this.changed.emit(this.value);
  }

}
