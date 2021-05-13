import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Response } from '../models/response'
import { StorageService } from '../services/storage.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  userId: string = '';
  constructor(private router: Router, public storage: StorageService, public api: ApiService) {

  }

  missionIdList: string[] = []
  ngOnInit() {
    this.getMissionList();
  }

  doRefresh(event) {
    //更新任務資料
    setTimeout(() => {
      event.target.complete();
      this.getMissionList();
    }, 1000);
  }

  getMissionList() {
    this.storage.getUserId().subscribe(id => {
      this.userId = id;
      let params = new HttpParams().set('status', '4').set('porterId', this.userId);
      this.api.getMissionListParams(params).subscribe(
        (res: Response) => {
          this.missionIdList = res.data.map(mission => mission.id);
          console.log(this.missionIdList)
        })
    })
  }
}

