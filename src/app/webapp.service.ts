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
import { ChCardRequest } from './model/ch-card-request.model';
import { PropertyType } from './model/property-type.model';
import { Operation } from './model/operation.model';
import { ChPropertyTypeRequest } from './model/ch-property-type-request.model';
import { SymbolEditDialogComponent } from './symbol-edit-dialog/symbol-edit-dialog.component';
import { OperationEditDialogComponent } from './operation-edit-dialog/operation-edit-dialog.component';
import { PropertytypeEditDialogComponent } from './propertytype-edit-dialog/propertytype-edit-dialog.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { UserRequest } from './model/user-request.model';
import { List } from './model/list.model';
import { DictionariesSettingsBoxes } from './model/dictionaries-settings-boxes';
import { BoxEditDialogComponent } from './box-edit-dialog/box-edit-dialog.component';
import { ChBoxRequest } from './model/ch-box-request.model';
import { ExportExcelRequest } from './model/export-excel-request.model';
import { ExportExcelResponse } from './model/export-excel-response.model';
import { CountEditDialogComponent } from './count-edit-dialog/count-edit-dialog.component';
import { Settings } from './model/settings.model';
import { SymbolProperty } from './model/symbol-property.model';
import { SymbolPropertyEditDialogComponent } from './symbol-property-edit-dialog/symbol-property-edit-dialog.component';
import { SettingsRequest } from './model/settings-request.model';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component'
import { Package } from './model/package.model';
import { DialogLogComponent } from './dialog-log/dialog-log.component';
import { PropertyWithName } from './model/property-with-name.model';
import { DialogPackageQtyComponent } from './dialog-package-qty/dialog-package-qty.component';
import { PackageBoxQty } from './model/package-box-qty';
import { DialogPackageBoxQtyComponent } from './dialog-package-box-qty/dialog-package-box-qty.component';

@Injectable({
  providedIn: 'root'
})
export class WebappService {
  rcr: RcrJsonService;
  dictionaries: DictionariesResponse = new DictionariesResponse;
  settings: Settings = new Settings;
  boxes: BoxResponse = new BoxResponse;
  // selected symbol id
  symbol: Symbol = new Symbol;

  // user query input value
  query = '';
  // selected box
  box: Box = new Box;
  // query result
  cards: CardQueryResponse = new CardQueryResponse;
  
  user: User;

  hasAccount(): boolean {
    return this.user && (this.user.token != 0);
  }

  load(): Observable<DictionariesSettingsBoxes> {
    const obs = new Observable<DictionariesSettingsBoxes>((observer) => {
      this.loadDictionaries().subscribe(d => {
        this.loadSettings().subscribe(settings => {
          this.loadBoxes().subscribe(b => {
            const r = new DictionariesSettingsBoxes;
            r.settings = settings;
            r.dictionaries = d;
            r.boxes = b;
            observer.next(r);
          });
        });
      });
    });
    return obs;
  }

  constructor(
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private aRcr: RcrJsonService
  ) { 
    this.rcr = aRcr;
    this.user = new User(localStorage.getItem('user'));
    this.box = new Box(localStorage.getItem('box'));
    this.symbol = new Symbol(localStorage.getItem('symbol'));
    const q = localStorage.getItem('query');
    this.query = q ? q : '';
    this.rcr.endpoints.select(localStorage.getItem('db'));
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
    if (box.box_id > 0n)
      query += ' ' + Box.boxBigint2string(box.box_id);
    r.query = query;

    this.rcr.cardQuery(r).subscribe(v => { 
      this.cards = v;
    });
  }

  private loadDictionaries() : Observable<DictionariesResponse> {
    const obs = new Observable<DictionariesResponse>((observer) => {
      const r = new DictionariesRequest;
      this.rcr.getDictionaries(r).subscribe(v => { 
        const sym = new Symbol;
        sym.id = 0;
        sym.description = "Все";
        v.symbol.unshift(sym);
        this.dictionaries = v;
        observer.next(v);
      });
  
    });
    return obs;
  }

  private loadSettings() : Observable<Settings> {
    const obs = new Observable<Settings>((observer) => {
      const r = new Settings;
      r.user = this.user;
      this.rcr.getSettings(r)
      .pipe(map(v => {
        v.symbol_property.forEach(sp => {
          sp.id = +sp.id;
          sp.property_type_id = +sp.property_type_id;
          sp.symbol_id = +sp.symbol_id;
        });
        return v;
      }))
      .subscribe(v => { 
        this.settings = v;
        observer.next(v);
      });
    });

    return obs;
  }

  private loadBoxes() : Observable<BoxResponse> {
    const obs = new Observable<BoxResponse>((observer) => {
      const r = new BoxRequest;
      r.user = this.user;
      r.list.size = 1000;
      this.rcr.getBox(r)
      .pipe(map(v => {
        // add helper property
        v.box.forEach(b => {
          b.box_id_name = Box.boxBigint2string(b.box_id);
        });
        return v;
      }))
      .subscribe(v => { 
        this.boxes = v;
        const b = new Box;
        b.name = "Все";
        b.box_id_name = "Все";
        this.boxes.box.unshift(b);
        observer.next(v);
      });
    });
    return obs;
  }

  loadExcelFile(
    symbol: string,
    prefixBox: bigint,
    numberInFilename: boolean,
    operation: string,
    fileName: string,
    content: string
  ) : Observable<OperationResponse>
  {
    const r = new ImportExcelRequest;
    r.number_in_filename = numberInFilename;
    r.prefix_box = prefixBox;
    r.symbol = symbol;
    r.operation = operation;
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

  public showCount(
    c: CardNPropetiesPackages
  ): Promise<string> {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      value: c
    };
    const dialogRef = this.dialog.open(CountEditDialogComponent, d);
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

  public showCard(
    card: CardNPropetiesPackages
  ): Promise<string> {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: 'Карточка ' + card.card.id,
      message: '',
      value: card
    };
    const dialogRef = this.dialog.open(CardEditDialogComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.componentInstance.changed.subscribe((request: ChCardRequest) => {
        const d = new MatDialogConfig();
        if (request.operationSymbol == '-') {
          d.autoFocus = true;
          d.disableClose = true;
          d.data = {
            title: 'Удалить карточку ',
            message: 'Удаленную запись невозможно восстановить',
            value: request.value.id + ' ' + request.value.name
          };
          const dialogRef = this.dialog.open(DialogConfirmComponent, d);
          dialogRef.afterClosed().subscribe(
              data => {
                if (data.yes) {
                  this.rcr.chCard(request).subscribe(
                    resp => {
                      if (resp && resp.code == 0) {
                        resolve("ok");
                      }
                    },
                    error => {
                      reject('fail');
                  });    
                }
              }
          );
        } else {
          this.rcr.chCard(request).subscribe(
            resp => {
              if (resp && resp.code == 0) {
                resolve("ok");
              }
            },
            error => {
              reject('fail');
          });    
          }
      });
      dialogRef.componentInstance.modified.subscribe((request: CardQueryRequest) => {
        if (request.query == '')
          return;
        this.rcr.cardQuery(request).subscribe(
          resp => {
            if (resp && resp.rslt.code == 0) {
              resolve("ok");
            }
          },
          error => {
            reject('fail');
          }
        );    
      }
      );
    });
  }

  public showPropertyType(
    v: PropertyType
  ) {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: 'Свойство ' + v.id,
      message: '',
      value: v
    };

    const dialogRef = this.dialog.open(PropertytypeEditDialogComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.componentInstance.changed.subscribe((v: PropertyType) => {
        const request = new ChPropertyTypeRequest() ;
        request.user = this.user;
        request.operationSymbol = "=";
        request.value = v;
        this.rcr.chPropertyType(request).subscribe(
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

  public showUser(
    v: User
  ) {
    const d = new MatDialogConfig();
    const isNew = !(v.id > 0);
    d.autoFocus = true;
    d.data = {
      title: isNew ? 'Новый пользователь' : 'Пользователь ' + v.id,
      message: '',
      value: v
    };BigInt.prototype.toJSON = function () {
      return this.toString();
    };

    const dialogRef = this.dialog.open(UserEditDialogComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.componentInstance.changed.subscribe((v: User) => {
        const request = new UserRequest() ;
        request.user = this.user;
        request.operationSymbol = isNew ? '+' : '=';
        v.token = 0;
        if (typeof v.rights !== "number")
          v.rights = 0;
        request.value = v;
        request.list = new List();
        this.rcr.chUser(request).subscribe(
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

  public showOperation(
    v: Operation
  ) {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: 'Операция ' + v.id,
      message: '',
      value: v
    };

    const dialogRef = this.dialog.open(OperationEditDialogComponent, d);
  }

  public showSymbol(
    v: Symbol
  ) {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: 'Тип компонента ' + v.id,
      message: '',
      value: v
    };
    const dialogRef = this.dialog.open(SymbolEditDialogComponent, d);
  }

  public showBox(
    v: Box
  ) {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: v.box_id ? 'Коробка ' + Box.boxBigint2string(v.box_id) : 'Новая коробка',
      message: '',
      value: v
    };
    const dialogRef = this.dialog.open(BoxEditDialogComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.componentInstance.changed.subscribe((v: ChBoxRequest) => {
        this.rcr.chBox(v).subscribe(
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

  public showSymbolProperty(v: SymbolProperty) : Observable<Settings> {
    const d = new MatDialogConfig();
    const isNew = !(v.id > 0);
    d.autoFocus = true;
    d.data = {
      title: isNew ? 'Новое свойство компонента' : 'Свойство компонента ' + v.id,
      message: '',
      value: v
    };

    const dialogRef = this.dialog.open(SymbolPropertyEditDialogComponent, d);

    let obs = new Observable<Settings>(ob => {
      dialogRef.componentInstance.changed.subscribe((v: SymbolProperty) => {
        let request = new SettingsRequest;
        request.user = this.user;
        request.settings = this.settings;
        request.settings.symbol_property.push(v);
        this.rcr.setSettings(request).subscribe(v => {
          ob.next(v)
        });
      });
      dialogRef.componentInstance.cancelled.subscribe(() => {
        ob.next(new Settings);
      });
    });
    return obs;
  }

  public showHistory(
    p: Package
  ): void {
    const d = new MatDialogConfig();
    let t = 'История ';
    if (p.card_id) {
      t += ' карточки ' + p.card_id;
      if (p.box)
        t += ' в коробке ' + Box.boxBigint2string(p.box)
    } else {
      if (p.box)
        t += ' коробки ' + Box.boxBigint2string(p.box)
    }
     
    d.autoFocus = true;
    d.data = {
      title: t,
      message: '',
      value: p
    };
    const dialogRef = this.dialog.open(DialogLogComponent, d);
  }

  public getBoxById(box_id: bigint): Box {
    for (let i = 0; i < this.boxes.box.length; i++) {
      if (this.boxes.box[i].box_id == box_id)
        return this.boxes.box[i];
    };
    return this.boxes.box.length ? this.boxes.box[0] : new Box;
  }

  public getComponentById(id: number): Symbol {
    for (let i = 0; i < this.dictionaries.symbol.length; i++) {
      if (this.dictionaries.symbol[i].id == id)
        return this.dictionaries.symbol[i];
    };
    return this.dictionaries.symbol.length ? this.dictionaries.symbol[0] : new Symbol;
  }

  getPropertyTypeById(id: number): PropertyType {
    for (let i = 0; i < this.dictionaries.property_type.length; i++) {
      if (this.dictionaries.property_type[i].id == id)
        return this.dictionaries.property_type[i];
    };
    return this.dictionaries.property_type.length ? this.dictionaries.property_type[0] : new PropertyType;
  }

  getPropertyTypeByKey(key: string): PropertyType {
    for (let i = 0; i < this.dictionaries.property_type.length; i++) {
      if (this.dictionaries.property_type[i].key == key)
        return this.dictionaries.property_type[i];
    };
    return this.dictionaries.property_type.length ? this.dictionaries.property_type[0] : new PropertyType;
  }

  exportExcel(lastQuery: string, symbolName: string): Observable<ExportExcelResponse> {
    const request = new ExportExcelRequest;
    request.user = this.user;
    request.query = lastQuery;
    request.symbol_name = symbolName;
    return this.rcr.exportExcel(request);
  }

  public confirmRmProperty(v: PropertyWithName): Promise<string> {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.disableClose = true;
    d.data = {
      title: 'Удалить свойство "' + v.property_type + ': ' + v.value + '"',
        message: 'Нажмите <Enter> для подтверждения',
        value: v
    };
    const dialogRef = this.dialog.open(DialogConfirmComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.yes) {
            resolve('y');
          }
        }
      );
    });
  }

  public confirmRmBox(v: ChBoxRequest): Promise<string> {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.disableClose = true;
    d.data = {
      title: 'Удалить коробку "' + v.value.name + ' ' + Box.boxBigint2string(v.value.box_id),
        message: 'Нажмите <Enter> для безвозвратного удаления',
        value: v
    };
    const dialogRef = this.dialog.open(DialogConfirmComponent, d);
    return new Promise<string>((resolve, reject) => { 
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.yes) {
            resolve('y');
          }
        }
      );
    });
  }

  public saveSession() : void {
    localStorage.setItem('box', JSON.stringify(this.box));
    localStorage.setItem('symbol', JSON.stringify(this.symbol));
    localStorage.setItem('query', this.query);
  }

  public showPackageQty(
    dlgTitle: string,
    initialValue: number
  ) : Promise<number>
  {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: dlgTitle,
      qty: initialValue
    };

    const dialogRef = this.dialog.open(DialogPackageQtyComponent, d);
    return new Promise<number>((resolve, reject) => { 
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.yes) {
            resolve(data.qty);
          }
        }
      );
    });
  }

  public movePackageToBox(
    dlgTitle: string,
    initialValue: number
  ) : Promise<PackageBoxQty>
  {
    const d = new MatDialogConfig();
    d.autoFocus = true;
    d.data = {
      title: dlgTitle,
      qty: initialValue
    };

    const dialogRef = this.dialog.open(DialogPackageBoxQtyComponent, d);
    return new Promise<PackageBoxQty>((resolve, reject) => { 
      dialogRef.afterClosed().subscribe(
        data => {
          if (data.yes) {
            const boxQty = new PackageBoxQty;
            boxQty.box_id = data.box_id;
            boxQty.qty = data.qty;
            resolve(boxQty);
          }
        }
      );
    });
  }

}
