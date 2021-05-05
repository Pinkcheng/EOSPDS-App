import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionUninitCardComponent } from './mission-uninit-card/mission-uninit-card.component';
import { MissionStartCardComponent } from './mission-start-card/mission-start-card.component';
import { MissionEndCardComponent } from './mission-end-card/mission-end-card.component';
import { MenuComponent } from './menu/menu.component';
import { ScanQrcodeButtonComponent } from './scan-qrcode-button/scan-qrcode-button.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MissionUninitCardComponent,
    MissionStartCardComponent,
    MissionEndCardComponent,
    MenuComponent,
    ScanQrcodeButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MissionUninitCardComponent,
    MissionStartCardComponent,
    MissionEndCardComponent,
    MenuComponent,
    ScanQrcodeButtonComponent
  ]
})
export class ComponentsModule { }
