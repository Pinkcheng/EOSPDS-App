import { StorageService } from './storage.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { Response } from '.././models';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'access_token';
const ID = 'id';
const NAME = 'name';
const DEPARTMENT = 'department'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  apiOptions = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
  token = null;

  constructor(
    public http: HttpClient,
    public storage: StorageService,
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
    return this.http.post<Response>('http://10.10.105.11:9487/auth/login', body.toString(), this.apiOptions).pipe(
      map((res: Response) => {
        if (res.status == 1) {
          const jwtHelper = new JwtHelperService();
          this.storage.setValue(TOKEN_KEY, res.data);
          this.storage.setValue(ID, jwtHelper.decodeToken(res.data).id);
          this.storage.setValue(NAME, jwtHelper.decodeToken(res.data).name);
          this.storage.setValue(DEPARTMENT, jwtHelper.decodeToken(res.data).department);
        }
        return res;
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      }),
      catchError((err: HttpErrorResponse) => {
        this.isAuthenticated.next(false); //暫時
        return of(err.error)
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.storage.removeValue(TOKEN_KEY)
    this.storage.removeValue(ID)
    this.storage.removeValue(NAME)
    return this.storage.removeValue(TOKEN_KEY);
  }
}

@Injectable()
export class TokenAuthHttpInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, public storage: StorageService) { }
  access_token: string | null = ""

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // token 可以來自任何地方
    console.warn(req.url.split('api')[1])
    const tokenObservable = this.storage.getTokenAsObservable()
      .pipe(
        map(token => (
          req = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token
            }
          })
        ))
      );
    return tokenObservable.pipe(
      switchMap(req => next.handle(req))
    );
  }
}
