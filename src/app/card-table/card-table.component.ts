import { Component, ViewChild } from '@angular/core';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { CardsDataSource } from '../card.ds.service';
import { RcrJsonService } from '../rcr-json.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Box } from '../model/box.model';
import { Symbol } from '../model/symbol.model';
import { Observable, delay, startWith, tap } from 'rxjs';

class dumbCollectionViewer implements CollectionViewer {
  viewChange!: Observable<ListRange>;
}

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public ds: CardsDataSource;
  public selection = new SelectionModel<number>(true, []);
  public selectionMode = 0; // 0- manually selected, 1- select all, 2- unselect all
  public displayedColumns: string[] = ['name', 'properties', 'box-qty'];
  lastSymbol: Symbol = new Symbol;
  lastBox: Box = new Box;
  lastQuery = '';

  constructor(
    public svc: RcrJsonService
  ) {
    this.ds = new CardsDataSource(this.svc);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith(null),
        delay(0),
        tap(() => {
          this.refresh();
        })
        )
      .subscribe();

    
    this.sort.sortChange
    .pipe(
      tap(() => {
        this.paginator.pageIndex = 0;
        this.refresh();
      })
    )
    .subscribe();

    this.ds.connect(new dumbCollectionViewer).subscribe(value => {
      this.paginator.length = this.ds.cardCount;
    });
  }

  load(
    symbol: Symbol,
    box: Box,
    query: string
  ): void {
    this.lastSymbol = symbol;
    this.lastBox = box;
    this.lastQuery = query;
    const ofs = this.paginator.pageIndex * this.paginator.pageSize;
    this.ds.load(symbol, box, query, ofs, this.paginator.pageSize);
  }

  showCard(
    id: number
  ): void {

  }

  showDetails(
    row: any): void {
      console.log(row);
  }

  refresh(): void {
    this.load(this.lastSymbol, this.lastBox, this.lastQuery);
  }

}
