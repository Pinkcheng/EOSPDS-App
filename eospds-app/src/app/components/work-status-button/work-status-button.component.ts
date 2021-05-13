import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { PunchService } from 'src/app/services/punch.service';

@Component({
  selector: 'app-work-status-button',
  templateUrl: './work-status-button.component.html',
  styleUrls: ['./work-status-button.component.scss'],
})
export class WorkStatusButtonComponent implements OnInit {

  isWorking$ = new Observable<boolean>();

  constructor(public err: ErrorService, public punch: PunchService) { }

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
          console.log('上班了哭哭');
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
          this.punch.setWorkingStatus(false)
          console.log('下班啦好爽');
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
