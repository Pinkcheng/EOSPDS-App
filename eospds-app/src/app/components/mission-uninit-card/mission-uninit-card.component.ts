import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MissionList } from 'src/app/models';
import { MissionData } from 'src/app/models/missionData';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { StorageService } from 'src/app/services/storage.service';
import { AppConfig } from 'src/app/share';

@Component({
  selector: 'app-mission-uninit-card',
  templateUrl: './mission-uninit-card.component.html',
  styleUrls: ['./mission-uninit-card.component.scss'],
})
export class MissionUninitCardComponent implements OnInit {

  constructor(
    public api: ApiService,
    public storage: StorageService,
    public err: ErrorService,
    public route: Router,
    public nav: NavController) { }

  @Input()
  missionId: string;
  missionData: MissionData;
  missionType: string = "";
  dispatchTime = new Date;
  startDepartment: string = "";
  endDepartment: string = "";
  missionProcess: any;

  ngOnInit() {
    this.api.getMissionData(this.missionId).subscribe(
      res => {
        this.missionData = res.data;
        this.missionProcess = this.missionData.process;
        this.missionType = this.missionData.label.type.name;
        this.dispatchTime = this.missionData.process.start.time;
        this.startDepartment = this.missionData.startDepartment.building.name + '-' +
          this.missionData.startDepartment.floor + '-' + this.missionData.startDepartment.name;
        this.endDepartment = this.missionData.endDepartment.building.name + '-' +
          this.missionData.endDepartment.floor + '-' + this.missionData.endDepartment.name;
      });
  }

  getBarcodeId($event: any) {
    let systemName = $event.split('///')[0];
    if (systemName != "") {
      if (systemName == 'EOSPDS') {
        //api action $event.split('///')[1]為編號
        this.storage.getUserId().subscribe(id => {
          let body = new URLSearchParams();
          body.set('action', '1');
          body.set('porter', id);
          body.set('handover', $event.split('///')[1]);
          this.err.presentAlert('請確認是否開始任務', 'QRcode: ' + $event.split('///')[2], [
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
                this.api.missionAction(this.missionId, body).subscribe(res => this.err.presentToast("開始任務"));
                console.log('開始任務');
              }
            }
          ])
        })
      } else {
        this.err.presentToast("非本系統QRcode");
      }
    }
  }
  nextpage() {
    this.nav.navigateForward('mission-data', { state: { id: this.missionData.id } });
  }
}
