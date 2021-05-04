import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private authService: AuthService, private router: Router, public storage: StorageService) { }
  missionList = [1, 2, 3, 4, 5, 6]
  ngOnInit() {
  }


}
