import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ComponentsModule } from './components/components.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlterService } from './services/alter.service';
import {NgxQRCodeModule} from 'ngx-qrcode2'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule,
    NgxQRCodeModule
  ],
  providers: [
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    StorageService,
    AlterService
  ],
  bootstrap: [AppComponent
  ],
})
export class AppModule { }
