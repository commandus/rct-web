import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { RcrJsonService } from './rcr-json.service';
import { WebappService } from './webapp.service';
import { Box } from './model/box.model';
import { BoxRequest } from './model/box-request.model';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */
export class BoxDataSource implements DataSource<Box> {
  private subject = new BehaviorSubject<Box[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public count = 0;

  constructor(
    private service: RcrJsonService,
    private app: WebappService
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<Box[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
      this.loadingSubject.complete();
  }

  load(
    ofs: number,
    pagesize: number
  ): void {
    this.loadingSubject.next(true);
    const r = new BoxRequest;
    r.user = this.app.user;
    r.list.offset = ofs;
    r.list.size = pagesize;
    this.service.getBox(r)
    .subscribe(
      value => {
        if (value.rslt) 
          this.count = value.rslt.count;
        else
          this.count = 0;
        this.subject.next(value.box);
        this.loadingSubject.next(false);
      });
  }
}
