import { Component, ViewChild } from '@angular/core';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { SymbolPropertyDataSource } from '../symbol-property.ds.service';
import { RcrJsonService } from '../rcr-json.service';
import { MatSort } from '@angular/material/sort';
import { Observable, delay, startWith, tap } from 'rxjs';
import { WebappService } from '../webapp.service';
import { Symbol } from '../model/symbol.model';
import { SymbolProperty } from '../model/symbol-property.model';
import { SymbolPropertyRequest } from '../model/symbol-property-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertyType } from '../model/property-type.model';
import { SettingsRequest } from '../model/settings-request.model';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
      private snackbar: MatSnackBar,
      private dialog: MatDialog
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
    this.app.showSymbolProperty(v).subscribe(v => {
      this.app.load().subscribe(v => {
        this.load();
      });
    });
  }

  rm(val: SymbolProperty) {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.disableClose = true;
    d.data = {
      title: 'Удалить свойство компонента ' + val.id,
      message: 'Удаленную запись невозможно восстановить',
      value: val
    };
    const dialogRef = this.dialog.open(DialogConfirmComponent, d);
    dialogRef.afterClosed().subscribe(
        data => {
          if (data.yes) {
            let request = new SymbolPropertyRequest;
            request.user = this.app.user;
            request.symbol_property = val;
            this.rcr.rmSymbolProperty(request).subscribe(v => {
              this.load();
              const snack = this.snackbar.open('Свойство компонента удалено', '', {duration: 1000});
              snack.onAction().subscribe(() => {
                console.log(v);
              });
            });
          }
        }
    );
  }

  save() {
    this.app.settings.symbol_property = Array.from(this.ds.subject.getValue());
    let sr = new SettingsRequest;
    sr.user = this.app.user;
    sr.settings = this.app.settings;

    this.rcr.setSettings(sr).subscribe(v => {
      /*
      this.app.load().subscribe(v => {
        this.load();
      });
      */
    });
  }

  refresh(): void {
    this.load();
  }

  propertyTypeSelected(symbolProperty: SymbolProperty, pt: PropertyType) : void {
    symbolProperty.property_type_id = pt.id;
  }

  symbolSelected(symbolProperty: SymbolProperty, sym: Symbol) : void {
    symbolProperty.symbol_id = sym.id;
  }

}

