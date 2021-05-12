import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
  }
  async setValue(key: string, value: string) {
    await this.storage.set(key, value);
  }

  async getValue(key: string) {
    const value = await this.storage.get(key);
    return value;
  }
  async removeValue(key: string) {
    await this.storage.remove(key);
  }
  getToken() {
    return this.storage.get('access_token').then(token => token)
  }
  getTokenAsObservable() {
    return from(this.getToken());
  }
  getUserId() {
    return from(this.storage.get('id').then(id => id))
  }
  getUserName() {
    return from(this.storage.get('name').then(name => name))
  }
  getUserDepartment() {
    return from(this.storage.get('department').then(department => department))
  }
}
