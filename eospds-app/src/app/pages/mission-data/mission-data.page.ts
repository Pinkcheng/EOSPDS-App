import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionData } from 'src/app/models/missionData';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mission-data',
  templateUrl: './mission-data.page.html',
  styleUrls: ['./mission-data.page.scss'],
})
export class MissionDataPage implements OnInit {

  missionId: string = "";
  missionData: MissionData;
  missionType: string = "";
  dispatchTime = new Date;
  startDepartment: string = "";
  endDepartment: string = "";
  missionProcess: any;
  instrument: string = "";
  content: string = "";

  constructor(public activatedRoute: ActivatedRoute, private router: Router, public api: ApiService) {
    if (router.getCurrentNavigation().extras.state) {
      const mission = this.router.getCurrentNavigation().extras.state;
      this.missionId = mission.id;
    }
  }

  ngOnInit() {
    this.api.getMissionData(this.missionId).subscribe(
      res => {
        this.missionData = res.data;
        this.missionProcess = this.missionData.process;
        this.missionType = this.missionData.label.type.name + '-' + this.missionData.label.name;
        this.dispatchTime = this.missionData.process.start.time;
        this.startDepartment = this.missionData.startDepartment.building.name + '-' +
          this.missionData.startDepartment.floor + '-' + this.missionData.startDepartment.name;
        this.endDepartment = this.missionData.endDepartment.building.name + '-' +
          this.missionData.endDepartment.floor + '-' + this.missionData.endDepartment.name;
        this.instrument = this.missionData.instrument.name;
        this.content = this.missionData.content;
      });
  }

}
