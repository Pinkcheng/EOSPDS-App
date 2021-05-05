import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-uninit-card',
  templateUrl: './mission-uninit-card.component.html',
  styleUrls: ['./mission-uninit-card.component.scss'],
})
export class MissionUninitCardComponent implements OnInit {

  constructor() { }

  @Input()
  missionData;

  ngOnInit() {
    console.log(this.missionData)
  }

}
