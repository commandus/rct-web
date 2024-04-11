import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { RcrJsonService } from './rcr-json.service';
import { Box } from './model/box.model';
import { Symbol } from './model/symbol.model';
import { CardQueryRequest } from './model/card-query-request.model';
import { CardNPropetiesPackages } from './model/card-npropeties-packages.model';
import { WebappService } from './webapp.service';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */
export class CardsDataSource implements DataSource<CardNPropetiesPackages> {
  private subject = new BehaviorSubject<CardNPropetiesPackages[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public count = 0;

  constructor(
    private service: RcrJsonService,
    private app: WebappService
  ) { }

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
    r.user = this.app.user;

    if (query.length == 0)
      query = '*';
    if (box.box_id > 0n)
      query += ' ' + Box.boxBigint2string(box.box_id);
    r.query = query;
    r.measure_symbol = symbol.sym;
    r.list.offset = ofs;
    r.list.size = pagesize;
    this.service.cardQuery(r)
    .subscribe(
      value => {
        this.count = value.rslt.count;
        this.subject.next(value.cards.cards);
        this.loadingSubject.next(false);
      });
  }
}
