import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ApiService } from './api.service';
import { ErrorService } from './error.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  userId!: string | null;
  missionCount: number = 0;
  constructor(public storage: StorageService, private localNotifications: LocalNotifications, public api: ApiService) {


  }
  notify(count) {
    console.log(count)
    this.localNotifications.schedule({
      id: 1,
      text: '您有' + count + '新任務',
      data: { secret: 'secret' },
      foreground: true
    });
  }
  checkMissionCount() {
    setInterval(() => {
      this.storage.getUserId().subscribe(id => {
        if (id != null) {
          this.userId = id;
          this.api.getPorterData(this.userId).subscribe(res => {
            if (res.data.mission > this.missionCount) {
              this.notify(res.data.mission - this.missionCount)
            }
            this.missionCount = res.data.mission
          })
        } else {
          this.userId = null;
          this.missionCount = 0;
        }
      })
    }, 5000)
  }
}
