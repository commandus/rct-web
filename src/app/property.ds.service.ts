import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { RcrJsonService } from './rcr-json.service';
import { WebappService } from './webapp.service';
import { DictionariesRequest } from './model/dictionaries-request.model';
import { PropertyType } from './model/property-type.model';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */
export class PropertyDataSource implements DataSource<PropertyType> {
  private subject = new BehaviorSubject<PropertyType[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public count = 0;

  constructor(
    private service: RcrJsonService,
    private app: WebappService
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<PropertyType[]> {
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
        this.count = value.property_type.length;
        this.subject.next(value.property_type);
        this.loadingSubject.next(false);
      });
  }
}
