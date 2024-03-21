import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { Operation } from '../model/operation.model';

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.css']
})
export class OperationEditComponent implements OnInit {
  @Input() value: Operation = new Operation;
  @Output() cancelled = new EventEmitter<void>();
  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  message = '';
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private app: WebappService
  ) {
    this.success = app.hasAccount();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.value ? this.value.id : '', []
      ],
      symbol: [this.value ? this.value.symbol : '', []
      ],
      description: [this.value ? this.value.description : '', []
      ]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }
}
