import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  public readonly apiUrl = 'http://140.125.45.125:9487';
  public readonly apiVersion = '/api/v1.0';
  public readonly apiOptions = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
}
