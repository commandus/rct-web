import { Component, ViewChild } from '@angular/core';
import { Symbol } from '../model/symbol.model';
import { Box } from '../model/box.model';
import { WebappService } from '../webapp.service';
import { CardTableComponent } from '../card-table/card-table.component';
import { AddNewItemIntoBoxComponent } from '../add-new-item-into-box/add-new-item-into-box';
import { ChCardRequest } from '../model/ch-card-request.model';

@Component({
  selector: 'app-add-into-box',
  templateUrl: './add-into-box.component.html',
  styleUrls: ['./add-into-box.component.css']
})
export class AddIntoBoxComponent {
  @ViewChild(CardTableComponent) cardTable!: CardTableComponent;
  @ViewChild(AddNewItemIntoBoxComponent) addNewItemIntoBoxComponent!: AddNewItemIntoBoxComponent;
  box: Box = new Box;

  constructor(
    public svc: WebappService
  ) { 
    svc.load().subscribe(v => {
      this.addNewItemIntoBoxComponent.setDictionaries(v.dictionaries);
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

  public onAdd(value: ChCardRequest) {
    console.log(value);
  }
}
