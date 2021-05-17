import { NgIf } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PorterData } from '../models/porterData';
import { ApiService } from './api.service';
import { ErrorService } from './error.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PunchService implements OnInit {
  userId!: string | null;
  constructor(
    public api: ApiService,
    public storage: StorageService,
    public err: ErrorService) {

    this.storage.getUserId().subscribe(id => {
      this.userId = id;
      this.api.getPorterData(id).subscribe(res => {
        this.porterData = res.data;
        if (this.porterData.status == 1) {
          this.isWorking$.next(true);
        } else {
          this.isWorking$.next(false);
        }
      })
    })
  }


  porterData!: PorterData;
  isWorking$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  ngOnInit(): void {

  }

  getWorkingStatus(): Observable<boolean> {
    return this.isWorking$;
  }

  setWorkingStatus(punch: boolean) {
    let body = new URLSearchParams()
    if (punch) {
      //上班
      body.set('punch', '1');
      this.api.porterPunch(this.userId, body).subscribe(res => {
        this.err.presentToast("上班打卡成功");
        this.isWorking$.next(punch);
      })
    } else {
      //下班
      body.set('punch', '2');
      this.api.porterPunch(this.userId, body).subscribe(res => {
        this.err.presentToast("下班打卡成功");
        this.isWorking$.next(punch);
      })
    }

  }

}
