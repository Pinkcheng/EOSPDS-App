import { Component, Input, OnInit } from '@angular/core';
import { MissionData } from 'src/app/models/missionData';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-mission-end-card',
  templateUrl: './mission-end-card.component.html',
  styleUrls: ['./mission-end-card.component.scss'],
})
export class MissionEndCardComponent implements OnInit {

  constructor(public api: ApiService) { }

  @Input()
  missionId: string;
  missionData: MissionData;
  missionType: string = "";
  endTime = new Date;
  startDepartment: string = "";
  endDepartment: string = "";
  missionProcess: any;

  ngOnInit() {
    this.api.getMissionData(this.missionId).subscribe(
      res => {
        this.missionData = res.data;
        this.missionProcess = this.missionData.process;
        this.missionType = this.missionData.label.type.name;
        this.endTime = this.missionData.process.finish.time;
        this.startDepartment = this.missionData.startDepartment.building.name + '-' +
          this.missionData.startDepartment.floor + '-' + this.missionData.startDepartment.name;
        this.endDepartment = this.missionData.endDepartment.building.name + '-' +
          this.missionData.endDepartment.floor + '-' + this.missionData.endDepartment.name;
      });
  }
}
