import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionUninitCardComponent } from './mission-uninit-card/mission-uninit-card.component';
import { MissionStartCardComponent } from './mission-start-card/mission-start-card.component';
import { MissionEndCardComponent } from './mission-end-card/mission-end-card.component';
import { MenuComponent } from './menu/menu.component';
import { ScanQrcodeButtonComponent } from './scan-qrcode-button/scan-qrcode-button.component';
import { FormsModule } from '@angular/forms';
import { WorkStatusButtonComponent } from './work-status-button/work-status-button.component';
import {NgxQRCodeModule} from 'ngx-qrcode2'
import { MissionDataPage } from '../pages/mission-data/mission-data.page';



@NgModule({
  declarations: [
    MissionUninitCardComponent,
    MissionStartCardComponent,
    MissionEndCardComponent,
    MenuComponent,
    ScanQrcodeButtonComponent,
    WorkStatusButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxQRCodeModule
  ],
  exports: [
    MissionUninitCardComponent,
    MissionStartCardComponent,
    MissionEndCardComponent,
    MenuComponent,
    ScanQrcodeButtonComponent,
    WorkStatusButtonComponent
  ]
})
export class ComponentsModule { }
