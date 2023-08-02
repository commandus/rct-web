import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
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
import { User } from './model/user.model';
import { UserResponse } from './model/user-response.model';

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
  getCard(request: GetItemRequest): Observable<CardNPropetiesPackages> {
    return this.httpClient.post<CardNPropetiesPackages>(Config.endpoint + "/getCard", request);
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
  lsUser(request: UserRequest): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(Config.endpoint + "/lsUser", request);
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
