import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { RcrJsonService } from './rcr-json.service';
import { WebappService } from './webapp.service';
import { User } from './model/user.model';
import { UserRequest } from './model/user-request.model';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */
export class UserDataSource implements DataSource<User> {
  private subject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public count = 0;

  constructor(
    private service: RcrJsonService,
    private app: WebappService
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
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
    const r = new UserRequest;
    r.user = this.app.user;
    // r.list.offset = ofs;
    // r.list.size = pagesize;
    this.service.lsUser(r)
    .subscribe(
      value => {
        this.count = value.user.length;
        this.subject.next(value.user);
        this.loadingSubject.next(false);
      });
  }
}
