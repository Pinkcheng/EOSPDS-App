import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  account: string = "0975879856";
  password: string = "123";
  apiOptions = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public auth: AuthService,
    private router: Router,
    public storage: StorageService
  ) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 10000
    });
    toast.present();
  }

  async ngOnInit() {
  }

  async login() {
    let body = new URLSearchParams();
    body.set('account', this.account);
    body.set('password', this.password);
    this.auth.login(body).subscribe(
      async (res) => {
        console.log(res);
        this.router.navigateByUrl('/tabs', { replaceUrl: true });

      }
    )
  }
}