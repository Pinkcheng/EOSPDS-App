import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlterService } from 'src/app/services/alter.service';

@Component({
  selector: 'app-work-status-button',
  templateUrl: './work-status-button.component.html',
  styleUrls: ['./work-status-button.component.scss'],
})
export class WorkStatusButtonComponent implements OnInit {
  isWorking$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(public alter: AlterService) { }

  ngOnInit() {
    if (this.porterData.status.id == 1) {
      this.isWorking$.next(true)
    } else {
      this.isWorking$.next(false)
    }

  }

  punchIn() {
    this.alter.presentAlertMultipleButtons(this.getPunchTime() + ' 打卡上班', '', [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: () => {
          this.isWorking$.next(true)
          console.log('Confirm Ok');
        }
      }
    ])
  }
  punchOut() {
    this.alter.presentAlertMultipleButtons(this.getPunchTime() + ' 打卡下班', '請確認是否完成所有任務', [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: () => {
          this.isWorking$.next(false)
          console.log('Confirm Ok');
        }
      }
    ])

  }
  porterData = {
    "id": "P10000001",
    "name": "李冠億",
    "tag": 123,
    "birthday": "1987/08/07",
    "department": {
      "id": "D1231",
      "building": {
        "id": "B1234",
        "name": "新醫療大樓"
      },
      "floor": "B1",
      "name": "傳送中心"
    },
    "gender": {
      "id": 1,
      "name": "男"
    },
    "type": {
      "id": 1,
      "name": "全院"
    },
    "status": {
      "id": 1,
      "name": "上班中"
    },
    "mission": 1,
    "position": "新醫療大樓-5F-5B病房",
    "time": "2021/03/30 10:20"
  }
  getPunchTime(): string {
    let timeNow = new Date(new Date().getTime() + 1000 * 60 * 60 * 2).toString();
    let punchTime = timeNow.split(' ')[4];
    return punchTime
  }

}
