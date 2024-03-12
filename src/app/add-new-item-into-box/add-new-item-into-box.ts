import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { WebappService } from '../webapp.service';
import { CardNPropetiesPackages } from '../model/card-npropeties-packages.model';
import { ChCardRequest } from '../model/ch-card-request.model';
import { Symbol } from '../model/symbol.model';
import { Property } from '../model/property.model';
import { PropertyWithName } from '../model/property-with-name.model';
import { Package } from '../model/package.model';
import { Box } from '../model/box.model';
import { DictionariesResponse } from '../model/dictionaries-response.model';

@Component({
  selector: 'app-add-new-item-into-box',
  templateUrl: './add-new-item-into-box.html',
  styleUrls: ['./add-new-item-into-box.css']
})
export class AddNewItemIntoBoxComponent implements OnInit {
  @Input() box: Box = new Box;
  @Input() enableScroll = true;
  @Output() added = new EventEmitter<ChCardRequest>();
  @ViewChild('name') name!: ElementRef;
  @ViewChild('qty') qty!: ElementRef;
  @ViewChild('nominal') nominal!: ElementRef;

  value: CardNPropetiesPackages = new CardNPropetiesPackages;
  private prefix = '';

  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  
  message = '';
  success: boolean;

  private dictionaries = new DictionariesResponse;

  constructor(
    private formBuilder: FormBuilder,
    private env: WebappService,
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
    this.value.packages.push(new Package);
   }

  public setDictionaries(value: DictionariesResponse) {
    this.dictionaries = value;
    this.clearProperties();
  }

  private clearProperties() {
    this.value.properties.splice(0);
   
    this.dictionaries.property_type.forEach(pt => {
      const pn : PropertyWithName = { id: pt.id, property_type: pt.key, value: '' };
      this.value.properties.push(pn);

    });
  }

  private clearNew() {

    this.name.nativeElement.value = '';
    this.qty.nativeElement.value = 0;
    if (this.nominal)
      this.nominal.nativeElement.value = 0;
    this.clearProperties();
  } 

  save(): void {
    const r = new ChCardRequest;

    r.value.id = this.value.card.id;
    r.user = this.env.user;
    // save card
    r.operationSymbol = '+';
    r.value.name = this.formGroup.getRawValue().name;
    r.value.uname = r.value.name.toUpperCase();
    r.value.symbol_id = this.value.card.symbol_id;
    
    r.value.nominal = Symbol.string2nominal(String.fromCharCode(+this.value.card.symbol_id + 0x40), 
      this.formGroup.getRawValue().nominal + this.prefix).toString();

    this.value.packages[0].box = this.box.box_id;
    this.value.packages[0].box_name = this.box.name;

    r.packages = this.value.packages;

    this.value.properties.forEach(pn => {
      if (pn.value.length > 0) {
        const p = new Property;
        p.card_id = this.value.card.id;
        p.value = pn.value;
        p.property_type_id = this.env.getPropertyTypeByKey(pn.property_type).id;
        r.properties.push(p);
      }
    });
    this.added.emit(r);
    this.clearNew();
  }

  onSymbolSelected(value: Symbol) {
    this.value.card.symbol_id = value.id;
  }

  onQtyChanged(value: any) {
    const q = this.formGroup.getRawValue().qty;
    this.value.packages[0].qty = q;
  }

  onPrefixSelected(value: string) {
    this.prefix = value;
  }

  addProperty(): void 
  {
    const p = new PropertyWithName;
    this.value.properties.push(p); 
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
