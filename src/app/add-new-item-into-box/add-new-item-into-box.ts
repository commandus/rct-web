import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { CardNPropetiesPackages } from '../model/card-npropeties-packages.model';
import { ChCardRequest } from '../model/ch-card-request.model';
import { Symbol } from '../model/symbol.model';
import { Property } from '../model/property.model';
import { RcrJsonService } from '../rcr-json.service';
import { PropertyWithName } from '../model/property-with-name.model';
import { Package } from '../model/package.model';
import { Box } from '../model/box.model';

@Component({
  selector: 'app-add-new-item-into-box',
  templateUrl: './add-new-item-into-box.html',
  styleUrls: ['./add-new-item-into-box.css']
})
export class AddNewItemIntoBoxComponent implements OnInit {
  @Input() box: Box = new Box;
  @Input() enableScroll = true;
  @Output() changed = new EventEmitter<ChCardRequest>();

    value: CardNPropetiesPackages = new CardNPropetiesPackages;

  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  
  message = '';
  success: boolean;

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
    this.formGroup = this.formBuilder.group({
      name: [this.value ? this.value.card.name : '', []],
      nominal: [this.value ? Symbol.nominal2string(String.fromCharCode(+this.value.card.symbol_id + 0x40), this.value.card.nominal) : 0, []],
      qty: [0, []]
    });
   }

  save(): void {
    const r = new ChCardRequest;
    r.value.id = this.value.card.id;
    r.user = this.env.user;
    // save card
    r.operationSymbol = '=';
    r.value.name = this.formGroup.getRawValue().name;
    r.value.symbol_id = this.value.card.symbol_id;
    r.value.nominal = Symbol.string2nominal(String.fromCharCode(+this.value.card.symbol_id + 0x40), this.formGroup.getRawValue().nominal).toString();
    r.packages = this.value.packages;

    this.value.properties.forEach(pn => {
      const p = new Property;
      p.card_id = this.value.card.id;
      p.value = pn.value;
      p.property_type_id = this.env.getPropertyTypeByKey(pn.property_type).id;
      r.properties.push(p);
    });

    this.changed.emit(r);
  }

  onSymbolSelected(value: Symbol) {
    this.value.card.symbol_id = value.id;
  }

  onQtyChanged(value: any) {
    const q = this.formGroup.getRawValue().qty;
    console.log(q);
  }

  addProperty(): void 
  {
    const p = new PropertyWithName;
    this.value.properties.push(p); 
  }

  addBox(): void 
  {
    const p = new Package;
    p.card_id = this.value.card.id;
    this.value.packages.push(p); 
  }

  public componentUnitName() : string
  {
    return Symbol.componentUnitName(this.value.card.symbol_id);
  }
  
  public componentPrefix() : string []
  {
    return Symbol.componentPrefix(this.value.card.symbol_id);
  }
  
  public hasUnit()
  {
    return Symbol.componentUnitName(this.value.card.symbol_id).length > 0;
  }
}
