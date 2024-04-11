import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DictionariesRequest } from './model/dictionaries-request.model';
import { DictionariesResponse } from './model/dictionaries-response.model';
import { LoginRequest } from './model/login-request.model';
import { LoginResponse } from './model/login-response.model';
import { Settings } from './model/settings.model';
import { ChPropertyTypeRequest } from './model/ch-property-type-request.model';
import { OperationResponse } from './model/operation-response.model';
import { ChCardRequest } from './model/ch-card-request.model';
import { ChBoxRequest } from './model/ch-box-request.model';
import { CardQueryRequest } from './model/card-query-request.model';
import { CardQueryResponse } from './model/card-query-response.model';
import { BoxResponse } from './model/box-response.model';
import { BoxRequest } from './model/box-request.model';
import { UserRequest } from './model/user-request.model';
import { GroupRequest } from './model/group-request.model';
import { GroupUserRequest } from './model/group-user-request.model';
import { ImportExcelRequest } from './model/import-excel-request.model';
import { CardNPropetiesPackages } from './model/card-npropeties-packages.model';
import { GetItemRequest } from './model/get-item-request.model';
import { UserResponse } from './model/user-response.model';
import { JournalRequest } from './model/journal-request.model';
import { JournalResponse } from './model/journal-response.model';
import { ExportExcelRequest } from './model/export-excel-request.model';
import { ExportExcelResponse } from './model/export-excel-response.model';
import { SymbolPropertyRequest } from './model/symbol-property-request.model';
import { SettingsRequest } from './model/settings-request.model';

class EndPoint {
  public url = "";
  public name = "";
  public selected = false;
}

// @see https://stackoverflow.com/questions/65152373/typescript-serialize-bigint-in-json
declare global
{
  interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

BigInt.prototype.toJSON = function() { return this.toString() }

export class EndPointList {
  public endpoints: EndPoint[] = [
    { url: "http://kb-srv.ysn.ru:8050", name: "КБ", selected: true },
    { url: "http://kb-srv.ysn.ru:8052", name: "ЛМИИ", selected: false },
    { url: "http://localhost:8050", name: "Тест(локальный)", selected: false }
  ];
  public current = this.endpoints[0];

  public select(name: string | null) : void {
    if (name == null) {
      this.current = this.endpoints[0];
      return;
    }
    this.endpoints.forEach(e => {
      e.selected = e.name == name;
      if (e.selected)
        this.current = e;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class RcrJsonService {
  public endpoints = new EndPointList;

  constructor(private httpClient: HttpClient) { }
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.endpoints.current.url + "/login", request);
  }
  getDictionaries(request: DictionariesRequest): Observable<DictionariesResponse> {
    return this.httpClient.post<DictionariesResponse>(this.endpoints.current.url + "/getDictionaries", request).pipe(
    map(v => {
      v.symbol.forEach(s => {
        s.id = +s.id;
      });
      v.operation.forEach(o => {
        o.id = +o.id;
      });
      v.property_type.forEach(pt => {
        pt.id = +pt.id;
      });
      return v;
    })
    );
  }

  getSettings(request: Settings): Observable<Settings> {
    return this.httpClient.post<Settings>(this.endpoints.current.url + "/getSettings", request).pipe(
      map(v => {
        v.service.forEach(s => {
          s.id = +s.id;
        });
        v.symbol_property.forEach(o => {
          o.id = +o.id;
          o.property_type_id = +o.property_type_id;
          o.symbol_id = +o.symbol_id;
        });
        return v;
      })
    );
  }
  setSettings(request: SettingsRequest): Observable<Settings> {
    return this.httpClient.post<Settings>(this.endpoints.current.url + "/setSettings", request);
  }
  rmSymbolProperty(request: SymbolPropertyRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(this.endpoints.current.url + "/rmSymbolProperty", request).pipe(
      map(v => {
        v.id = +v.id;
        return v;
      })
    );
  }
  chPropertyType(request: ChPropertyTypeRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(this.endpoints.current.url + "/chPropertyType", request);
  }
  getCard(request: GetItemRequest): Observable<CardNPropetiesPackages> {
    return this.httpClient.post<CardNPropetiesPackages>(this.endpoints.current.url + "/getCard", request);
  }
  chCard(request: ChCardRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(this.endpoints.current.url + "/chCard", request);
  }
  chBox(request: ChBoxRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(this.endpoints.current.url + "/chBox", request);
  }
  cardQuery(request: CardQueryRequest): Observable<CardQueryResponse> {
    return this.httpClient.post<CardQueryResponse>(this.endpoints.current.url + "/cardQuery", request);
  }
  getBox(request: BoxRequest): Observable<BoxResponse> {
    return this.httpClient.post<BoxResponse>(this.endpoints.current.url + "/getBox", request);
  }
  lsUser(request: UserRequest): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(this.endpoints.current.url + "/lsUser", request);
  }
  chUser(request: UserRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(this.endpoints.current.url + "/chUser", request);
  }
  chGroup(request: GroupRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(this.endpoints.current.url + "/chGroup", request);
  }
  chGroupUser(request: GroupUserRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(this.endpoints.current.url + "/chGroupUser", request);
  }
  importExcel(request: ImportExcelRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(this.endpoints.current.url + "/importExcel", request);
  }
  lsJournal(request: JournalRequest): Observable<JournalResponse> {
    return this.httpClient.post<JournalResponse>(this.endpoints.current.url + "/lsJournal", request).pipe(
      map(v => {
        v.rslt.id = +v.rslt.id;
        v.rslt.count = +v.rslt.count;
        v.rslt.sum = +v.rslt.sum;
        v.log.forEach(l=> {
          l.id = +l.id;
          l.dt = +l.dt;
        });
        return v;
      })
    );
  }
  
  exportExcel(request: ExportExcelRequest): Observable<ExportExcelResponse> {
    return this.httpClient.post<ExportExcelResponse>(this.endpoints.current.url + "/exportExcel", request);
  }
}
