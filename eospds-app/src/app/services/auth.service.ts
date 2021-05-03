import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  apiOptions = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
  token = null;

  constructor(
    public http: HttpClient,
    public storage: StorageService
  ) {
    this.loadToken();
  }

  async loadToken() {
    this.storage.getValue(TOKEN_KEY).then((value) => {
      this.token = value;
      if (this.token != null) {
        this.isAuthenticated.next(true);
      } else {
        this.isAuthenticated.next(false);
      }
    });
  }

  login(body: URLSearchParams): Observable<any> {
    return this.http.post('http://10.10.105.11:9487/auth/login', body.toString(), this.apiOptions).pipe(
      map((res: any) => {
        this.storage.setValue(TOKEN_KEY, res.data);
        return res;
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.storage.removeValue(TOKEN_KEY);
  }
}
