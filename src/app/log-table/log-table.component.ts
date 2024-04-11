import { Component, Input, ViewChild } from '@angular/core';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { RcrJsonService } from '../rcr-json.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, delay, startWith, tap } from 'rxjs';
import { WebappService } from '../webapp.service';
import { LogDataSource } from '../log.ds.service';
import { Log } from '../model/log';
import { GetItemRequest } from '../model/get-item-request.model';
import { Operation } from '../model/operation.model';

class dumbCollectionViewer implements CollectionViewer {
  viewChange!: Observable<ListRange>;
}

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css']
})
export class LogTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() box = 0n;
  @Input() card_id = 0;
  @Input() hideButtons = false;
 
  public ds: LogDataSource;
  public selection = new SelectionModel<number>(true, []);
  public selectionMode = 0; // 0- manually selected, 1- select all, 2- unselect all
  public displayedColumns: string[] = ['id', 'dt', 'user', 'card', 'operation', 'package', 'qty'];
  
  constructor(
      public rcr: RcrJsonService,
      public app: WebappService
  ) {
    this.ds = new LogDataSource(this.rcr, this.app);
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
    this.ds.load(this.box, this.card_id, ofs, this.paginator.pageSize);
  }

  show(row: Log) {
    const request = new GetItemRequest;
    request.user = this.app.user;
    request.id = row.card.id;
    this.rcr.getCard(request).subscribe( v => {
      this.app.showCard(v).then(v=>{this.refresh();});
    });

  }

  refresh(): void {
    this.load();
  }

  getOperationClass(op: Operation) : string{
    let s = 'op';
    switch(op.symbol) {
      case '=':
        s = 'op-assign';
        break;
      case '+':
        s = 'op-add';
        break;
      case '-':
        s = 'op-sub';
        break;
      default:
    }
    return s;
  }

}
