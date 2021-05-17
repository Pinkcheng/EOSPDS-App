import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from './../share/app-config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response'
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userId: string = "";
  constructor(
    public app: AppConfig,
    public http: HttpClient,
    public err: ErrorService
  ) {

  }

  apiURL: string = this.app.apiUrl + this.app.apiVersion;
  apiPorter = '/porter';
  apiMission = '/mission';

  /*-----------------------mission------------------------------ */
  //取得特定傳送員特定任務狀態之任務列表
  getMissionListParams(params: HttpParams): Observable<Response> {
    return this.http.get<Response>(this.apiURL + this.apiMission + '?' + params.toString(), this.app.apiOptions).pipe(catchError(this.err.handleError))
  }
  //取得特定任務資料
  getMissionData(missionId: string): Observable<Response> {
    return this.http.get<Response>(this.apiURL + this.apiMission + '/' + missionId, this.app.apiOptions).pipe(catchError(this.err.handleError))
  }
  //開始任務or完成任務
  missionAction(missionId: string, body: URLSearchParams): Observable<Response> {
    return this.http.post<Response>(this.apiURL + this.apiMission + '/' + missionId + '/action', body.toString(), this.app.apiOptions).pipe(catchError(this.err.handleError))
  }
  /*-----------------------porter------------------------------ */
  //取得特定傳送員資料
  getPorterData(porterId: string): Observable<Response> {
    return this.http.get<Response>(this.apiURL + this.apiPorter + '/' + porterId, this.app.apiOptions).pipe(catchError(this.err.handleError))
  }
  //傳送員打卡上下班
  porterPunch(porterId: string, body: URLSearchParams): Observable<Response> {
    return this.http.post<Response>(this.apiURL + this.apiPorter + '/' + porterId + '/punch', body.toString(), this.app.apiOptions).pipe(catchError(this.err.handleError))
  }
}
