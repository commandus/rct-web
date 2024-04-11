import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { RcrJsonService } from './rcr-json.service';
import { WebappService } from './webapp.service';
import { JournalRequest } from './model/journal-request.model';
import { Log } from './model/log';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */

export class LogDataSource implements DataSource<Log> {
  private subject = new BehaviorSubject<Log[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public count = 0;

  constructor(
    private service: RcrJsonService,
    private app: WebappService
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<readonly Log[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
      this.loadingSubject.complete();
  }

  load(
    box: bigint,
    card_id: number,
    ofs: number,
    pagesize: number
  ): void {
    this.loadingSubject.next(true);
    const r = new JournalRequest;
    r.box = box;
    r.card_id = card_id;
    r.user = this.app.user;
    r.list.offset = ofs;
    r.list.size = pagesize;
    this.service.lsJournal(r)
    .subscribe(
      value => {
        if (value.rslt) 
          this.count = value.rslt.count;
        else
          this.count = 0;
        this.subject.next(value.log);
        this.loadingSubject.next(false);
      });
  }
}
