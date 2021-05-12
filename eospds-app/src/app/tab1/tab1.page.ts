import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Response } from '../models/response'
import { StorageService } from '../services/storage.service';
import { HttpParams } from '@angular/common/http';
import { MissionList } from '../models';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userId: string = '';
  constructor(private router: Router, public storage: StorageService, public api: ApiService) {

  }

  missionIdList: string[] = []
  ngOnInit() {
    this.storage.getUserId().subscribe(id => {
      this.userId = id;
      let params = new HttpParams().set('status', '2').set('porterId', this.userId);
      this.api.getMissionListParams(params).subscribe(
        (res: Response) => {
          this.missionIdList = res.data.map(mission => mission.id);
          console.log(this.missionIdList)
        }, (err) => console.log(err.error))
    })
  }

  doRefresh(event) {
    //更新任務資料
    this.storage.getUserId().subscribe(id => {
      this.userId = id;
      let params = new HttpParams().set('status', '2').set('porterId', this.userId);
      this.api.getMissionListParams(params).subscribe(
        (res: Response) => {
          this.missionIdList = res.data.map(mission => mission.id);
          console.log(this.missionIdList)
        }, (err) => console.log(err.error))
    })
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
