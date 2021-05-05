import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mission-uninit-card',
  templateUrl: './mission-uninit-card.component.html',
  styleUrls: ['./mission-uninit-card.component.scss'],
})
export class MissionUninitCardComponent implements OnInit {

  constructor(public alertController: AlertController) { }

  @Input()
  missionData;
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
    console.log(this.missionData)
  }

  getBarcodeId($event: any) {

    let systemName = $event.split('///')[0];
    if (systemName == 'EOSPDS') {
      //api action $event.split('///')[1]為編號
      //if res
      this.presentAlertMultipleButtons($event.split('///')[2]);
      //通知cardlist刷新
      //else
      //this.presentAlertMultipleButtons('失敗');
    } else {
      this.presentAlertMultipleButtons('非本系統QRcode');
    }
  }
}
