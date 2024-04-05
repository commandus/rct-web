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
import { ComponentListComponent } from '../component-list/component-list.component';
import { SymbolProperty } from '../model/symbol-property.model';

@Component({
  selector: 'app-add-new-item-into-box',
  templateUrl: './add-new-item-into-box.html',
  styleUrls: ['./add-new-item-into-box.css']
})
export class AddNewItemIntoBoxComponent implements OnInit {
  @Input() box: Box = new Box;
  @Input() enableScroll = true;
  @Output() added = new EventEmitter<ChCardRequest>();
  @ViewChild(ComponentListComponent) componentList!: ComponentListComponent;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('qty') qty!: ElementRef;
  @ViewChild('nominal') nominal!: ElementRef;

  value: CardNPropetiesPackages = new CardNPropetiesPackages;
  private prefix = '';
  // save previous request to fill up 20240913
  public previousRequest = new ChCardRequest;
  private lastSymbol = new Symbol;

  public formGroup: FormGroup = new FormGroup({});
  
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
      name: [this.value ? this.value.card.name : '', []],
      nominal: [this.value ? Symbol.nominal2string(String.fromCharCode(+this.value.card.symbol_id + 0x40), this.value.card.nominal) : 0, []],
      qty: [0, []]
    });
    this.value.packages.push(new Package);
   }

  private clearProperties() {
    this.value.properties.splice(0);
    this.app.dictionaries.property_type.forEach(pt => {
      const pn : PropertyWithName = { id: pt.id, property_type: pt.key, value: '' };
      if (this.isPropertyMandatory(this.value.card.symbol_id, pt.id))
        this.value.properties.push(pn);
    });
  }

  private isPropertyMandatory(symbolId: number, propertyTypeId: number) : boolean {
    let a = this.app.settings.symbol_property.find(
      (value: SymbolProperty, index: number, obj: SymbolProperty[]) => {
        return value.property_type_id == propertyTypeId && value.symbol_id == symbolId;
      });
    return typeof(a) != 'undefined';
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
    r.user = this.app.user;
    // save card
    r.operationSymbol = '+';
    r.value.name = this.formGroup.getRawValue().name;
    r.value.uname = r.value.name.toUpperCase();
    r.value.symbol_id = this.value.card.symbol_id;
    
    r.value.nominal = Symbol.string2nominal(String.fromCharCode(+this.value.card.symbol_id + 0x40), 
      this.formGroup.getRawValue().nominal + this.prefix).toString();

    this.value.packages[0].box = this.box.box_id;
    this.value.packages[0].box_name = this.box.name;

    // clone
    r.packages = [];
    this.value.packages.forEach(val => r.packages.push(Object.assign({}, val)));

    this.value.properties.forEach(pn => {
      if (pn.value.length > 0) {
        const p = new Property;
        p.card_id = this.value.card.id;
        p.value = pn.value;
        p.property_type_id = this.app.getPropertyTypeByKey(pn.property_type).id;
        r.properties.push(p);
      }
    });
    // save as previous
    this.previousRequest = r;
    this.added.emit(r);
    // Clear form
    this.clearNew();
  }

  onSymbolSelected(value: Symbol) {
    this.value.card.symbol_id = value.id;
    this.clearProperties();
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

  public hasPreviousRequestSaved() {
    return this.previousRequest.operationSymbol.length > 0;
  }

  public fillForm(v: ChCardRequest) : void {
    this.componentList.setSymbolId(v.value.symbol_id);
    this.name.nativeElement.value = v.value.name;
    if (v.packages.length > 0)
      this.qty.nativeElement.value = v.packages[0].qty;
    if (this.nominal)
      this.nominal.nativeElement.value = v.value.nominal;
    
    this.value.properties.slice(0);
    let i = 0;
    this.app.dictionaries.property_type.forEach(pt => {
      let pv = '';
      
      v.properties.forEach(v => {
          if (v.property_type_id == pt.id)
            pv = v.value;
        }
      );
      const pn : PropertyWithName = { id: pt.id, property_type: pt.key, value: pv };

      if (pv.length > 0 || this.isPropertyMandatory(this.value.card.symbol_id, pt.id))
        this.value.properties[i] = pn;
      i++;
    });
  }

}
