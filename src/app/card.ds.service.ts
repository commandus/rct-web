import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RcrJsonService } from './rcr-json.service';
import { Box } from './box.model';
import { Symbol } from './symbol.model';
import { CardQueryRequest } from './card-query-request.model';
import { CardNPropetiesPackages } from './card-npropeties-packages.model';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */
export class CardsDataSource implements DataSource<CardNPropetiesPackages> {
  private subject = new BehaviorSubject<CardNPropetiesPackages[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public cardCount = 0;

  constructor(private service: RcrJsonService) { }

  connect(collectionViewer: CollectionViewer): Observable<CardNPropetiesPackages[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
      this.loadingSubject.complete();
  }

  load(
    symbol: Symbol,
    box: Box,
    query: string,
    ofs: number,
    pagesize: number
  ): void {
    this.loadingSubject.next(true);
    const r = new CardQueryRequest;
    if (query.indexOf('*') < 0)
      query += '*';
    if (box.box_id.length > 0)
      query += ' ' + Box.box2string(box.box_id);
    r.query = query;
    r.measure_symbol = symbol.sym;
    r.list.offset = ofs;
    r.list.size = pagesize;
    this.service.cardQuery(r)
    .subscribe(
      value => {
        this.cardCount = value.rslt.count;
        this.subject.next(value.cards.cards);
        this.loadingSubject.next(false);
      });
  }
}
