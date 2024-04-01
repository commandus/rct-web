import { Component, Input, ViewChild } from '@angular/core';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { Observable, delay, startWith, tap } from 'rxjs';
import { CardsDataSource } from '../card.ds.service';
import { RcrJsonService } from '../rcr-json.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Box } from '../model/box.model';
import { Symbol } from '../model/symbol.model';
import { CardNPropetiesPackages } from '../model/card-npropeties-packages.model';
import { WebappService } from '../webapp.service';
import { GetItemRequest } from '../model/get-item-request.model';
import { ExcelHelper } from '../model/excel-helper.model';
import { Package } from '../model/package.model';

class dumbCollectionViewer implements CollectionViewer {
  viewChange!: Observable<ListRange>;
}

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent {
  @Input() autoload = true;
  @Input() editcountonly = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public ds: CardsDataSource;
  public selection = new SelectionModel<number>(true, []);
  public selectionMode = 0; // 0- manually selected, 1- select all, 2- unselect all
  public displayedColumns: string[] = ['name', 'nominal', 'properties', 'box-qty', 'action'];
  lastSymbol: Symbol = new Symbol;
  lastBox: Box = new Box;
  lastQuery = '';

  constructor(
    public rcr: RcrJsonService,
    public app: WebappService
  ) {
    this.ds = new CardsDataSource(this.rcr, this.app);
  }

  ngAfterViewInit() {
    if (!this.autoload) {
      this.lastQuery = 'Do-not-load';
    }

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
      this.paginator.length = this.ds.count;
    });
  }

  load(
    symbol: Symbol,
    box: Box,
    query: string
  ): void {
    if (this.lastSymbol != symbol || this.lastBox != box || this.lastQuery != query)
      this.paginator.pageIndex = 0;
    this.lastSymbol = symbol;
    this.lastBox = box;
    this.lastQuery = query;
    const ofs = this.paginator.pageIndex * this.paginator.pageSize;
    this.ds.load(symbol, box, query, ofs, this.paginator.pageSize);
  }

  clear(): void {
    let box = new Box;
    box.box_id = '42-42-42-42';
    this.ds.load(new Symbol, box, '', 0, 0);
  }

  edit(row: CardNPropetiesPackages) {
    if (this.editcountonly) {
      this.app.showCount(row).then(v=>{this.refresh();});
    } else {
      const request = new GetItemRequest;
      request.user = this.app.user;
      request.id = row.card.id;
      this.rcr.getCard(request).subscribe( v => {
        this.app.showCard(v).then(v=>{this.refresh();});
      });
    }
  }

  refresh(): void {
    this.load(this.lastSymbol, this.lastBox, this.lastQuery);
  }

  export2excel(): void {
    this.app.exportExcel(this.lastQuery, this.lastSymbol.sym).subscribe( v => {
      v.file.forEach(f => {
        const downloadURL = window.URL.createObjectURL(ExcelHelper.b64toBlob(f.content));
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = f.name;
        link.click();
      });

    });
  }

  showHistory(p: Package): void {
    this.app.showHistory(p);
  }

}
