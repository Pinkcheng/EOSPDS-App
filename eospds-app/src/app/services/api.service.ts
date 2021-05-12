import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from './../share/app-config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response'
import { catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userId: string = "";
  constructor(
    public app: AppConfig,
    public http: HttpClient,
  ) {

  }

  apiURL: string = this.app.apiUrl + this.app.apiVersion;
  apiBuilding = '/building';
  apiDepartment = '/department';
  apiStaff = '/staff';
  apiPorter = '/porter';
  apiMission = '/mission';
  apiMissionInstrument = '/mission_instrument';
  apiMissionType = '/mission_type';
  apiMissionLabel = '/mission_label';
  apiDispatch = '/dispatch';

  //取得特定傳送員特定任務狀態之任務列表
  getMissionListParams(params: HttpParams): Observable<Response> {
    return this.http.get<Response>(this.apiURL + this.apiMission + '?' + params.toString(), this.app.apiOptions)
  }
  //取得特定任務資料
  getMissionData(missionId: string): Observable<Response> {
    return this.http.get<Response>(this.apiURL + this.apiMission + '/' + missionId, this.app.apiOptions)
  }
  missionAction(missionId: string, body: URLSearchParams) {
    return this.http.post<Response>(this.apiURL + this.apiMission + '/' + missionId, body.toString(), this.app.apiOptions)
  }
}
