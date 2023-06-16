import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { DictionariesRequest } from './dictionaries-request.model';
import { DictionariesResponse } from './dictionaries-response.model';
import { LoginRequest } from './login-request.model';
import { LoginResponse } from './login-response.model';
import { Settings } from './settings.model';
import { ChPropertyTypeRequest } from './ch-property-type-request.model';
import { OperationResponse } from './operation-response.model';
import { ChCardRequest } from './ch-card-request.model';
import { ChBoxRequest } from './ch-box-request.model';
import { CardQueryRequest } from './card-query-request.model';
import { CardQueryResponse } from './card-query-response.model';
import { BoxResponse } from './box-response.model';
import { BoxRequest } from './box-request.model';
import { UserRequest } from './user-request.model';
import { GroupRequest } from './group-request.model';
import { GroupUserRequest } from './group-user-request.model';
import { ImportExcelRequest } from './import-excel-request.model';

@Injectable({
  providedIn: 'root'
})
export class RcrJsonService {

  constructor(private httpClient: HttpClient) { }
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(Config.endpoint + "/login", request);
  }
  getDictionaries(request: DictionariesRequest): Observable<DictionariesResponse> {
    return this.httpClient.post<DictionariesResponse>(Config.endpoint + "/getDictionaries", request);
  }
  getSettings(request: Settings): Observable<Settings> {
    return this.httpClient.post<Settings>(Config.endpoint + "/getSettings", request);
  }
  setSettings(request: Settings): Observable<Settings> {
    return this.httpClient.post<Settings>(Config.endpoint + "/setSettings", request);
  }
  chPropertyType(request: ChPropertyTypeRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(Config.endpoint + "/chPropertyType", request);
  }
  chCard(request: ChCardRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(Config.endpoint + "/chCard", request);
  }
  chBox(request: ChBoxRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(Config.endpoint + "/chBox", request);
  }
  cardQuery(request: CardQueryRequest): Observable<CardQueryResponse> {
    return this.httpClient.post<CardQueryResponse>(Config.endpoint + "/cardQuery", request);
  }
  getBox(request: BoxRequest): Observable<BoxResponse> {
    return this.httpClient.post<BoxResponse>(Config.endpoint + "/getBox", request);
  }
  chUser(request: UserRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(Config.endpoint + "/chUser", request);
  }
  chGroup(request: GroupRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(Config.endpoint + "/chGroup", request);
  }
  chGroupUser(request: GroupUserRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(Config.endpoint + "/chGroupUser", request);
  }
  importExcel(request: ImportExcelRequest): Observable<OperationResponse> {
    return this.httpClient.post<OperationResponse>(Config.endpoint + "/importExcel", request);
  }

}
