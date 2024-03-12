import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Symbol } from '../model/symbol.model';
import { Box } from '../model/box.model';
import { WebappService } from '../webapp.service';
import { CardTableComponent } from '../card-table/card-table.component';
import { AddNewItemIntoBoxComponent } from '../add-new-item-into-box/add-new-item-into-box';
import { ChCardRequest } from '../model/ch-card-request.model';
import { RcrJsonService } from '../rcr-json.service';

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
    private snackbar: MatSnackBar,
    public svc: WebappService,
    public rcr: RcrJsonService
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

  public onAdd(request: ChCardRequest) {
    console.log(request);
    this.rcr.chCard(request).subscribe(
      value => {
        const snack = this.snackbar.open('Элемент добавлен', '№ ' + value.id, {duration: 1000});
        snack.onAction().subscribe(() => {
          console.log(value.count);
          console.log(value.description);
        });
        this.loadBox();
      });
  }
}
