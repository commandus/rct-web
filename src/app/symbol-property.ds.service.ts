import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { RcrJsonService } from './rcr-json.service';
import { WebappService } from './webapp.service';
import { SymbolProperty } from './model/symbol-property.model';
import { Settings } from './model/settings.model';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */
export class SymbolPropertyDataSource implements DataSource<SymbolProperty> {
  public subject = new BehaviorSubject<SymbolProperty[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public count = 0;

  constructor(
    private service: RcrJsonService,
    private app: WebappService
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<SymbolProperty[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
      this.loadingSubject.complete();
  }

  load(): void {
    this.loadingSubject.next(true);
    const r = new Settings;
    r.user = this.app.user;

    this.service.getSettings(r)
    .subscribe(
      value => {
        this.count = value.symbol_property.length;
        this.subject.next(value.symbol_property);
        this.loadingSubject.next(false);
    });
  }
}
