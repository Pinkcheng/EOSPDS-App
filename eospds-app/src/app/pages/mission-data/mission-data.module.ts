import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissionDataPageRoutingModule } from './mission-data-routing.module';

import { MissionDataPage } from './mission-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissionDataPageRoutingModule
  ],
  declarations: [MissionDataPage]
})
export class MissionDataPageModule {}
