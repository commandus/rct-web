import { Injectable } from '@angular/core';
import { RcrJsonService } from './rcr-json.service';
import { DictionariesResponse } from './model/dictionaries-response.model';
import { DictionariesRequest } from './model/dictionaries-request.model';
import { BoxResponse } from './model/box-response.model';
import { Box } from './model/box.model';
import { Symbol } from './model/symbol.model';
import { AuthenticationService } from './authentication.service';
import { BoxRequest } from './model/box-request.model';
import { Observable, map } from 'rxjs';
import { CardQueryRequest } from './model/card-query-request.model';
import { CardQueryResponse } from './model/card-query-response.model';
import { ImportExcelRequest } from './model/import-excel-request.model';
import { ExcelFile } from './model/excel-file.model';
import { OperationResponse } from './model/operation-response.model';
import { User } from './model/user.model';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Reload } from './model/reload.model';
import { CardNPropetiesPackages } from './model/card-npropeties-packages.model';
import { CardEditDialogComponent } from './card-edit-dialog/card-edit-dialog.component';
import { GetItemRequest } from './model/get-item-request.model';
import { ChCardRequest } from './model/ch-card-request.model';

@Injectable({
  providedIn: 'root'
})
export class WebappService {
  rcr: RcrJsonService;
  dictionaries: DictionariesResponse = new DictionariesResponse;
  boxes: BoxResponse = new BoxResponse;
  // selected symbol id
  symbol: Symbol = new Symbol;

  // user query input value
  query = "";
  // selected box
  box: Box = new Box;
  // query result
  cards: CardQueryResponse = new CardQueryResponse;
  
  user: User;

  hasAccount(): boolean {
    return this.user && (this.user.token != 0);
  }

  load(): void {
    this.loadDictionaries();
    this.loadBoxes();
  }

  constructor(
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private arcr: RcrJsonService
  ) { 
    this.rcr = arcr;
    this.user = new User(localStorage.getItem('user'));
    this.load();
  }

  cardQuery(
    symbol: Symbol,
    box: Box,
    query: string
  ): void  {
    const r = new CardQueryRequest;
    r.user = this.user;
    if (query.indexOf('*') < 0)
      query += '*';
    r.measure_symbol = symbol.sym;
    if (box.box_id.length > 0)
      query += ' ' + Box.box2string(box.box_id);
    r.query = query;

    this.rcr.cardQuery(r).subscribe(v => { 
      this.cards = v;
    });
  }

  private loadDictionaries() {
    const r = new DictionariesRequest;
    this.rcr.getDictionaries(r).subscribe(v => { 
      this.symbol = new Symbol;
      this.symbol.id = 0;
      this.symbol.description = "Все";
      v.symbol.unshift(this.symbol);
      this.dictionaries = v;
    });
  }

  private loadBoxes() {
    const r = new BoxRequest;
    r.user = this.user;
    this.rcr.getBox(r)
    .pipe(map(v => {
      // add helper property
      v.box.forEach(b => {
        b.box_id_name = Box.box2string(b.box_id);
      });
      return v;
    }))
    .subscribe(v => { 
      this.boxes = v;
      const b = new Box;
      b.name = "Все";
      b.box_id_name = "Все";
      this.boxes.box.unshift(b);
    });
  }

  loadExcelFile(
    symbol: string,
    prefixBox: string,
    numberInFilename: boolean,
    fileName: string,
    content: string
  ) : Observable<OperationResponse>
  {
    const r = new ImportExcelRequest;
    r.number_in_filename = numberInFilename;
    r.prefix_box = prefixBox;
    r.symbol = symbol;
    r.user = this.user;
    const file = new ExcelFile;
    file.name = fileName;
    file.content = btoa(content);
    r.file = [file];
    return this.rcr.importExcel(r);
  }

  public login(self?: Reload) {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: 'Введите логин и пароль',
      message: 'для входа',
      user: this.user
    };
    const dialogRef = this.dialog.open(DialogLoginComponent, d);
    dialogRef.componentInstance.logged.subscribe((value: User) => {
      if (value.token && value.token) {
        this.user = new User(value);
        localStorage.setItem('user', JSON.stringify(value));
      } else {
        this.logout(self);
        this.authenticationService.load();
      }
    });
  }

  public logout(self?: Reload) {
    this.user.logout();
  }

  public showCard(
    card: CardNPropetiesPackages
  ): Promise<string> {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: 'Карточка',
      message: '',
      value: card
    };
    const dialogRef = this.dialog.open(CardEditDialogComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.componentInstance.changed.subscribe((request: ChCardRequest) => {
        this.rcr.chCard(request).subscribe(
          resp => {
            if (resp && resp.code == 0) {
              resolve("ok");
            }
          },
          error => {
            reject('fail');
        });    
      });
        
    });
  }

  public getComponentById(id: number): Symbol {
    for (let i = 0; i < this.dictionaries.symbol.length; i++) {
      if (this.dictionaries.symbol[i].id == id)
        return this.dictionaries.symbol[i];
    };
    return this.dictionaries.symbol.length ? this.dictionaries.symbol[0] : new Symbol;
  }

}

