import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MissionList } from 'src/app/models';
import { MissionData } from 'src/app/models/missionData';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { AppConfig } from 'src/app/share';

@Component({
  selector: 'app-mission-uninit-card',
  templateUrl: './mission-uninit-card.component.html',
  styleUrls: ['./mission-uninit-card.component.scss'],
})
export class MissionUninitCardComponent implements OnInit {

  constructor(public alertController: AlertController, public api: ApiService, public storage: StorageService) { }

  @Input()
  missionId: string;
  missionData: MissionData;
  missionLabel: string = "";
  dispatchTime = new Date;
  startDepartment: string = "";
  endDepartment: string = "";
  missionProcess: any;
  async presentAlertMultipleButtons(text: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '交接',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }
  ngOnInit() {
    this.api.getMissionData(this.missionId).subscribe(
      res => {
        this.missionData = res.data;
        console.log(res.data)
        this.missionProcess = this.missionData.process;
        this.missionLabel = this.missionData.label.name;
        this.dispatchTime = this.missionData.process[1].time;
        this.startDepartment = this.missionData.startDepartment.building.name + '-' +
          this.missionData.startDepartment.floor + '-' + this.missionData.startDepartment.name;
        this.endDepartment = this.missionData.endDepartment.building.name + '-' +
          this.missionData.endDepartment.floor + '-' + this.missionData.endDepartment.name;
      }, (err) => console.log(err.error));
  }

  getBarcodeId($event: any) {
    if ($event != null) {
      let systemName = $event.split('///')[0];
      if (systemName == 'EOSPDS') {
        //api action $event.split('///')[1]為編號
        this.storage.getUserId().subscribe(id => {
          let body = new URLSearchParams();
          body.set('dispatch', '1');
          body.set('porter', id);
          this.api.missionAction(this.missionId, body).subscribe(res => this.presentAlertMultipleButtons($event.split('///')[2]));
        })
      } else {
        this.presentAlertMultipleButtons('非本系統QRcode');
      }
    }
  }
}
