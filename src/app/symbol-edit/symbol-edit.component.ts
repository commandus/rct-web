import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { Symbol } from '../model/symbol.model';

@Component({
  selector: 'app-symbol-edit',
  templateUrl: './symbol-edit.component.html',
  styleUrls: ['./symbol-edit.component.css']
})
export class SymbolEditComponent implements OnInit {
  @Input() value: Symbol = new Symbol;
  @Output() cancelled = new EventEmitter<void>();
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
      sym: [this.value ? this.value.sym : '', []
      ],
      description: [this.value ? this.value.description : '', []
      ],
      unit: [this.value ? this.value.unit : '', []
      ],
      pow10: [this.value ? this.value.pow10 : '', []
      ]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  save(): void {
    this.cancelled.emit();
  }

}
