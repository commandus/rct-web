import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { RcrJsonService } from './rcr-json.service';
import { WebappService } from './webapp.service';
import { DictionariesRequest } from './model/dictionaries-request.model';
import { Operation } from './model/operation.model';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */
export class OperationDataSource implements DataSource<Operation> {
  private subject = new BehaviorSubject<Operation[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public count = 0;

  constructor(
    private service: RcrJsonService,
    private app: WebappService
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<Operation[]> {
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
    const r = new DictionariesRequest;
    this.service.getDictionaries(r)
    .subscribe(
      value => {
        this.count = value.operation.length;
        this.subject.next(value.operation);
        this.loadingSubject.next(false);
      });
  }
}
