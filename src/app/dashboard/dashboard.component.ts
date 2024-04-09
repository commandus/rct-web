import { Component, HostListener, ViewChild } from '@angular/core';
import { Box } from '../model/box.model';
import { WebappService } from '../webapp.service';
import { Symbol } from '../model/symbol.model';
import { CardTableComponent } from '../card-table/card-table.component';
import { ComponentListComponent } from '../component-list/component-list.component';
import { BoxCombolistComponent } from '../box-combolist/box-combolist.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(CardTableComponent) cardTable!: CardTableComponent;
  @ViewChild(ComponentListComponent) componentList!: ComponentListComponent;
  @ViewChild(BoxCombolistComponent) boxCombolist!: BoxCombolistComponent;
  
  @HostListener('window:beforeunload', ['$event'])
  save($event: any) {
    this.app.saveSession();
  }

  constructor(public app: WebappService) { 
    app.load().subscribe(v => {
      this.componentList.setSymbolId(this.app.symbol.id);
      this.boxCombolist.setBoxId(this.app.box.box_id);
      this.cardTable.load(app.symbol, app.box, app.query);
    });
  }

  public onQuery(symbol: Symbol, box: Box, query: string) {
    this.app.box = box;
    this.app.symbol = symbol;
    this.cardTable.load(symbol, box, query);
  }

}
