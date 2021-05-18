import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PorterData } from 'src/app/models/porterData';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { PunchService } from 'src/app/services/punch.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-work-status-button',
  templateUrl: './work-status-button.component.html',
  styleUrls: ['./work-status-button.component.scss'],
})
export class WorkStatusButtonComponent implements OnInit {

  isWorking$ = new Observable<boolean>();

  constructor(public err: ErrorService, public punch: PunchService, public storage: StorageService, public api: ApiService) { }

  ngOnInit() {
    this.isWorking$ = this.punch.getWorkingStatus();
  }

  punchIn() {
    this.err.presentAlert(this.getPunchTime() + ' 打卡上班', '', [
      {
        text: '取消',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('取消');
        }
      }, {
        text: '確定',
        handler: () => {
          this.punch.setWorkingStatus(true)
        }
      }
    ])
  }
  punchOut() {
    this.err.presentAlert(this.getPunchTime() + ' 打卡下班', '請確認是否完成所有任務', [
      {
        text: '取消',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('取消');
        }
      }, {
        text: '確定',
        handler: () => {
          //需檢查目前手上任務為0
          let missionCount = 0;
          this.storage.getUserId().subscribe(id => {
            this.api.getPorterData(id).subscribe(res => {
              missionCount = res.data.count;
              if (missionCount == 0) {
                this.punch.setWorkingStatus(false)
              } else {
                this.err.presentToast('您還有任務尚未完成')
              }
            });
          })

        }
      }
    ])
  }

  getPunchTime(): string {
    let timeNow = new Date(new Date().getTime() + 1000 * 60 * 60 * 2).toString();
    let punchTime = timeNow.split(' ')[4];
    return punchTime
  }
}
