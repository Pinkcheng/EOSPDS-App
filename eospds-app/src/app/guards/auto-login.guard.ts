import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router, private storage: StorageService) { }

  canLoad(): Observable<boolean> {
    return this.auth.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Directly open inside area
          console.log('Found previous token, automatic login');
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}
