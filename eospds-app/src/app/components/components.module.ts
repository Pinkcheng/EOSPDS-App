import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionUninitCardComponent } from './mission-uninit-card/mission-uninit-card.component';
import { MissionStartCardComponent } from './mission-start-card/mission-start-card.component';
import { MissionEndCardComponent } from './mission-end-card/mission-end-card.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    MissionUninitCardComponent,
    MissionStartCardComponent,
    MissionEndCardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MissionUninitCardComponent,
    MissionStartCardComponent,
    MissionEndCardComponent,
    MenuComponent
  ]
})
export class ComponentsModule { }
