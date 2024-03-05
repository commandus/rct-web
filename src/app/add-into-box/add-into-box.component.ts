import { Component, OnInit, ViewChild } from '@angular/core';
import { Symbol } from '../model/symbol.model';
import { Box } from '../model/box.model';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';
import { PropertyWithName } from '../model/property-with-name.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RcrJsonService } from '../rcr-json.service';
import { CardQueryResponse } from '../model/card-query-response.model';
import { CardTableComponent } from '../card-table/card-table.component';

@Component({
  selector: 'app-add-into-box',
  templateUrl: './add-into-box.component.html',
  styleUrls: ['./add-into-box.component.css']
})
export class AddIntoBoxComponent implements OnInit {
    @ViewChild(CardTableComponent) cardTable!: CardTableComponent;
    public formGroup: FormGroup = new FormGroup({});
    public symbol: Symbol = new Symbol;
    box: Box = new Box;
    public value = new CardQueryResponse;

    public operation = '=';
  
    constructor(
      public svc: WebappService, 
      private router: Router,
      private formBuilder: FormBuilder,
      public rcr: RcrJsonService
    ) { 
      svc.load().subscribe(v=>{});
    }
  
    ngOnInit(): void {
      this.initForm();
    }
  
    private initForm() {
      this.formGroup = this.formBuilder.group({
        name: ['', []],
        nominal: [0, []]
      });
     }
  
    private loadBox() : void {
      const symbol = new Symbol;
      if (this.box.empty())
        this.cardTable.clear();
      else
        this.cardTable.load(symbol, this.box, '');
    }

    onBoxChanged(
      box: Box
    ): void {
      this.box = box;
      this.loadBox();
    }
  
    onSymbolSelected(value: Symbol) {
      // this.value.card.symbol_id = value.id;
    }
  
    addProperty(): void 
    {
      const p = new PropertyWithName;
      // this.value.properties.push(p); 
    }
  
    save() {

    }

    back() {
      this.router.navigateByUrl('');
    }
  
  }
  