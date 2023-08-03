import { Component, ViewChild } from '@angular/core';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { OperationDataSource } from '../operation.ds.service';
import { RcrJsonService } from '../rcr-json.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, delay, startWith, tap } from 'rxjs';
import { WebappService } from '../webapp.service';
import { GetItemRequest } from '../model/get-item-request.model';
import { Operation } from '../model/operation.model';

class dumbCollectionViewer implements CollectionViewer {
  viewChange!: Observable<ListRange>;
}

@Component({
  selector: 'app-operation-table',
  templateUrl: './operation-table.component.html',
  styleUrls: ['./operation-table.component.css']
})
export class OperationTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  public ds: OperationDataSource;
  public selection = new SelectionModel<number>(true, []);
  public selectionMode = 0; // 0- manually selected, 1- select all, 2- unselect all
  public displayedColumns: string[] = ['id', 'symbol', 'description'];
  
    constructor(
      public rcr: RcrJsonService,
      public app: WebappService
  ) {
    this.ds = new OperationDataSource(this.rcr, this.app);
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

  show(row: Operation) {
    this.app.showOperation(row);
  }

  refresh(): void {
    this.load();
  }

}
