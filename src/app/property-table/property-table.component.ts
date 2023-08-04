import { Component, ViewChild } from '@angular/core';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { PropertyDataSource } from '../property.ds.service';
import { RcrJsonService } from '../rcr-json.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, delay, startWith, tap } from 'rxjs';
import { WebappService } from '../webapp.service';
import { GetItemRequest } from '../model/get-item-request.model';
import { PropertyType } from '../model/property-type.model';

class dumbCollectionViewer implements CollectionViewer {
  viewChange!: Observable<ListRange>;
}

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  public ds: PropertyDataSource;
  public selection = new SelectionModel<number>(true, []);
  public selectionMode = 0; // 0- manually selected, 1- select all, 2- unselect all
  public displayedColumns: string[] = ['id', 'key', 'description'];
  
    constructor(
      public rcr: RcrJsonService,
      public app: WebappService
  ) {
    this.ds = new PropertyDataSource(this.rcr, this.app);
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
      this.paginator.length = this.ds.count;
    });
  }

  load(): void {
    const ofs = this.paginator.pageIndex * this.paginator.pageSize;
    this.ds.load(ofs, this.paginator.pageSize);
  }

  edit(row: PropertyType) {
    this.app.showPropertyType(row).then(v=>{this.refresh();});
  }

  add() {
    const v = new PropertyType();
    this.app.showPropertyType(v).then(v=>{this.refresh();});
  }

  refresh(): void {
    this.load();
  }

}
