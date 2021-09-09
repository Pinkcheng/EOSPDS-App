import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan-qrcode-button',
  templateUrl: './scan-qrcode-button.component.html',
  styleUrls: ['./scan-qrcode-button.component.scss'],
})
export class ScanQrcodeButtonComponent implements OnInit {

  @Output()
  barcodeTextEvent = new EventEmitter();
  @Input()
  missionId:string;

  scannedBarCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(private scanner: BarcodeScanner, private qrScanner: QRScanner, public nav: NavController) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }
  ngOnInit() { }

  scanBRcode() {
   /* this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      this.barcodeTextEvent.emit(this.scannedBarCode['text']);
    }).catch(err => {
      alert(err);
    });*/
    this.nav.navigateForward('qrcode', { state: { id: this.missionId } });
  }
}
