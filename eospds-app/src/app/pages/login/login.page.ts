import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { Response } from '../../models'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  account: string = "0975879856";
  password: string = "123";

  constructor(
    public err: ErrorService,
    public auth: AuthService,
    private router: Router,
  ) { }


  async ngOnInit() {
  }

  async login() {
    let body = new URLSearchParams();
    body.set('account', this.account);
    body.set('password', this.password);
    this.auth.login(body).subscribe(
      async (res: Response) => {
        this.err.presentToast(res.message)
        if (res.status == 1) {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        }
      },
    )
  }
}
