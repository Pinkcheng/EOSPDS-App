import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Response } from '../models'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public auth: AuthService
  ) { }

  handleError = (error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.presentToast(error.error.message)

    if (error.status == 401) {//token過期
      this.auth.logout();
    }
    return throwError(errorMessage);
  }

  handleResponse = (res: Response) => {
    if (res.message.length > 0) {
      this.presentToast(res.message)
    }
  }

  async presentAlert(header: string, message: string, buttons: any) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    await toast.present();
  }
}
