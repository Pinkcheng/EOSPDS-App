import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private authService: AuthService, private router: Router, public storage: StorageService) { }
  missionList = [
    {
      "id": "M100100000000202103310001",
      "type": "回病房",
      "dispatchTime": "2021-04-30T07:20:04.000Z",
      "startDepartment": "新醫療大樓-B1-Ｘ光室",
      "endDepartment": "新醫療大樓-5F-5B病房"
    },
    {
      "id": "M100100000000202103310001",
      "type": "回病房",
      "dispatchTime": "2021-04-30T07:20:04.000Z",
      "startDepartment": "新醫療大樓-B1-Ｘ光室",
      "endDepartment": "新醫療大樓-5F-5B病房"
    },
    {
      "id": "M100100000000202103310001",
      "type": "回病房",
      "dispatchTime": "2021-04-30T07:20:04.000Z",
      "startDepartment": "新醫療大樓-B1-Ｘ光室",
      "endDepartment": "新醫療大樓-5F-5B病房"
    },
    {
      "id": "M100100000000202103310001",
      "type": "回病房",
      "dispatchTime": "2021-04-30T07:20:04.000Z",
      "startDepartment": "新醫療大樓-B1-Ｘ光室",
      "endDepartment": "新醫療大樓-5F-5B病房"
    },
    {
      "id": "M100100000000202103310001",
      "type": "回病房",
      "dispatchTime": "2021-04-30T07:20:04.000Z",
      "startDepartment": "新醫療大樓-B1-Ｘ光室",
      "endDepartment": "新醫療大樓-5F-5B病房"
    },
    {
      "id": "M100100000000202103310001",
      "type": "回病房",
      "dispatchTime": "2021-04-30T07:20:04.000Z",
      "startDepartment": "新醫療大樓-B1-Ｘ光室",
      "endDepartment": "新醫療大樓-5F-5B病房"
    }
  ]
  ngOnInit() {

  }

  doRefresh(event) {
    //更新任務資料
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
