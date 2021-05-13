import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService, TokenAuthHttpInterceptor } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ComponentsModule } from './components/components.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ApiService } from './services/api.service';
import { ShareModule } from './share/share.module';
import { PunchService } from './services/punch.service';


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
    ShareModule,
    ComponentsModule,
    ShareModule,
    ComponentsModule,
    NgxQRCodeModule
  ],
  providers: [
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    StorageService,
    ApiService,
    PunchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent
  ],
})
export class AppModule { }
