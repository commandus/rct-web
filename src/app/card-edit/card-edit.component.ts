import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { CardNPropetiesPackages } from '../model/card-npropeties-packages.model';
import { ChCardRequest } from '../model/ch-card-request.model';
import { Symbol } from '../model/symbol.model';
import { Property } from '../model/property.model';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  @Input() value: CardNPropetiesPackages = new CardNPropetiesPackages;
  @Output() changed = new EventEmitter<ChCardRequest>();
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
      name: [this.value ? this.value.card.name : '',
        [ Validators.required ]
      ],
      nominal: [this.value ? this.value.card.nominal : 0,
        [ Validators.required ]
      ]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  save(): void {
    const r = new ChCardRequest;
    r.value.id = this.value.card.id;
    r.user = this.env.user;
    // save card
    r.operationSymbol = '=';
    r.value.name = this.formGroup.getRawValue().name;
    r.value.symbol_id = this.value.card.symbol_id;
    r.value.nominal = this.formGroup.getRawValue().nominal;
    r.packages = this.value.packages;

    this.value.properties.forEach(pn => {
      const p = new Property;
      p.card_id = 0;
      p.value = '';
      r.properties.push(p);
    });

    this.changed.emit(r);
  }

  onSymbolSelected(value: Symbol) {
    this.value.card.symbol_id = value.id;
  }

}
