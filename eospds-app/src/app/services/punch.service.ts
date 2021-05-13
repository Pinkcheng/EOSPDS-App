import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PorterData } from '../models/porterData';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PunchService implements OnInit {

  constructor(
    public api: ApiService,
    public storage: StorageService) {

    this.storage.getUserId().subscribe(id => {
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

  setWorkingStatus(isAdmin: boolean) {
    if (isAdmin) {
      //上班api
    } else {
      //下班api
    }
    this.isWorking$.next(isAdmin);
  }

}
