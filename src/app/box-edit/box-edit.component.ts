import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { RcrJsonService } from '../rcr-json.service';
import { Box } from '../model/box.model';
import { ChBoxRequest } from '../model/ch-box-request.model';

@Component({
  selector: 'app-box-edit',
  templateUrl: './box-edit.component.html',
  styleUrls: ['./box-edit.component.css']
})
export class BoxEditComponent implements OnInit {
  @Input() value: Box = new Box;
  @Output() changed = new EventEmitter<ChBoxRequest>();
  @Output() cancelled = new EventEmitter<void>();
  
  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  
  message = '';
  success: boolean;
  id = 0;

  constructor(
    private formBuilder: FormBuilder,
    private env: WebappService,
    private svc: RcrJsonService
  ) {
    this.success = env.hasAccount();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.id = this.value ? this.value.id : 0;
    this.formGroup = this.formBuilder.group({
      box: [this.value ? Box.box2string(this.value.box_id): '', [ Validators.required]],
      name: [this.value ? this.value.name : '', []]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  save(): void {
    const r = new ChBoxRequest;
    r.value.id = this.id;
    r.user = this.env.user;
    r.operationSymbol = this.id ? '=' : '+';
    r.value.box_id = Box.string2box(this.formGroup.getRawValue().box);
    r.value.name = this.formGroup.getRawValue().name;
    
    // save box
    this.changed.emit(r);
  }

}
