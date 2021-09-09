import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { NavController } from '@ionic/angular';
import { MissionData } from 'src/app/models/missionData';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  @Output()
  barcodeTextEvent = new EventEmitter();

  missionId: string = "";
  missionStatus: number = 0;
  constructor(
    private qrScanner: QRScanner,
    public navCtrl: NavController, 
    public activatedRoute: ActivatedRoute, 
    private router: Router, 
    public api: ApiService,
    public storage: StorageService,
    public err: ErrorService,) {

    if (router.getCurrentNavigation().extras.state) {
      const mission = this.router.getCurrentNavigation().extras.state;
      this.missionId = mission.id;
      this.api.getMissionData(this.missionId).subscribe(
        res => {
          this.missionStatus = res.data.status;
        })
    }

    this.scanBRcode(); //掃描
  }
  ngOnInit() {
  }
  scanBRcode() {
     this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        // start scanning
        this.qrScanner.show()
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          this.missionAction(text);
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.navCtrl.pop()
        });
 
      } else if (status.denied) {
        alert("請至設定開啟相機權限");
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        alert("請至設定開啟相機權限");
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
   })
   .catch((e: any) => console.log('Error is', e));
   }

   missionAction(qrcode) {
    let systemName = qrcode.split('///')[0];
    if (systemName != "") {
      if (systemName == 'EOSPDS') {
        //api action $event.split('///')[1]為編號
        var alterText = ""
        this.storage.getUserId().subscribe(id => {
          let body = new URLSearchParams();
          if(this.missionStatus == 2){
            body.set('action', '1');
            alterText = '請確認是否開始任務';
          }else{
            body.set('action', '2');
            alterText = '請確認是否完成任務';
          }
          body.set('porter', id);
          body.set('handover', qrcode.split('///')[1]);
          this.err.presentAlert(alterText, 'QRcode: ' + qrcode.split('///')[2], [
            {
              text: '取消',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('取消');
              }
            }, {
              text: '確定',
              handler: () => {
                this.api.missionAction(this.missionId, body).subscribe(res => this.err.presentToast("開始任務"));
                console.log('開始任務');
              }
            }
          ])
        })
      } else {
        alert("非本系統QRcode");
      }
    }
  }
}
