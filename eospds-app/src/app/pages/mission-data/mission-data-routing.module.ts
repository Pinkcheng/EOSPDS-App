import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionDataPage } from './mission-data.page';

const routes: Routes = [
  {
    path: '',
    component: MissionDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionDataPageRoutingModule {}
