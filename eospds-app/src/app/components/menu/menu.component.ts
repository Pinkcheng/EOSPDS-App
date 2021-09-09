import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, public nav: NavController) { }

  ngOnInit() { }

  async logout() {
    this.router.navigateByUrl('/login',{replaceUrl:true});
    await this.authService.logout();
    console.log('logout')
  }
}
