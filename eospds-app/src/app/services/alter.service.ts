import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlterService {

  constructor(public alertController: AlertController) { }

  async presentAlertMultipleButtons(header: string, message: string, buttons: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: buttons
    });
    await alert.present();
  }
}
