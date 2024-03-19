import { Component, ViewChild } from '@angular/core';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { SymbolPropertyDataSource } from '../symbol-property.ds.service';
import { RcrJsonService } from '../rcr-json.service';
import { MatSort } from '@angular/material/sort';
import { Observable, delay, startWith, tap } from 'rxjs';
import { WebappService } from '../webapp.service';
import { Symbol } from '../model/symbol.model';
import { SymbolProperty } from '../model/symbol-property.model';
import { RmSymbolPropertyRequest } from '../model/rm-symbol-property-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';

class dumbCollectionViewer implements CollectionViewer {
  viewChange!: Observable<ListRange>;
}

@Component({
  selector: 'app-symbol-property-table',
  templateUrl: './symbol-property-table.component.html',
  styleUrls: ['./symbol-property-table.component.css']
})
export class SymbolPropertyTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
 
  public ds: SymbolPropertyDataSource;
  public selection = new SelectionModel<number>(true, []);
  public selectionMode = 0; // 0- manually selected, 1- select all, 2- unselect all
  public displayedColumns: string[] = ['symbol_id', 'property_type_id', 'id' ];
  
  constructor(
      public rcr: RcrJsonService,
      public app: WebappService,
      private snackbar: MatSnackBar
  ) {
    this.ds = new SymbolPropertyDataSource(this.rcr, this.app);
  }

  ngAfterViewInit() {
    this.sort.sortChange
    .pipe(
      tap(() => {
        this.refresh();
      })
    )
    .subscribe();

    this.ds.connect(new dumbCollectionViewer).subscribe(value => {
    });
    this.load();
  }

  load(): void {
    this.ds.load();
  }

  show(row: SymbolProperty) {
    this.app.showSymbolProperty(row);
  }

  add() {
    let v = new SymbolProperty;
    this.app.showSymbolProperty(v);
  }

  rm(value: SymbolProperty) {
    let request = new RmSymbolPropertyRequest;
    request.user = this.app.user;
    request.symbol_property = value;
    this.rcr.rmSymbolProperty(request).subscribe(v => {
      this.load();
      const snack = this.snackbar.open('Свойство компонента удалено', '', {duration: 1000});
      snack.onAction().subscribe(() => {
        console.log(v);
      });

    });
  }

  save() {
    this.load();
    // reload settings
    this.app.load().subscribe(v => {
      console.log('saved & reloaded');
    });
  }

  refresh(): void {
    this.load();
  }

}

