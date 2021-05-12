import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MissionData } from 'src/app/models/missionData';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-mission-end-card',
  templateUrl: './mission-end-card.component.html',
  styleUrls: ['./mission-end-card.component.scss'],
})
export class MissionEndCardComponent implements OnInit {

  constructor(public alertController: AlertController, public api: ApiService) { }

  @Input()
  missionId: string;
  missionData: MissionData;
  missionLabel: string = "";
  endTime = new Date;
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
        this.endTime = this.missionData.process[3].time;
        this.startDepartment = this.missionData.startDepartment.building.name + '-' +
          this.missionData.startDepartment.floor + '-' + this.missionData.startDepartment.name;
        this.endDepartment = this.missionData.endDepartment.building.name + '-' +
          this.missionData.endDepartment.floor + '-' + this.missionData.endDepartment.name;
      }, (err) => console.log(err.error));
  }
}
