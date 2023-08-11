import { Component, ViewChild } from '@angular/core';
import { Box } from '../model/box.model';
import { WebappService } from '../webapp.service';
import { Symbol } from '../model/symbol.model';
import { CardTableComponent } from '../card-table/card-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(CardTableComponent) cardTable!: CardTableComponent;

  constructor(public svc: WebappService) { 
      svc.load().subscribe(v=>{});
  }

  public onQuery(symbol: Symbol, box: Box, query: string) {
    this.svc.symbol = symbol;
    this.cardTable.load(symbol, box, query);
  }

}
