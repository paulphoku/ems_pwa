import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(
    public alertController: AlertController

  ) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'EMRS',
      subHeader: 'Caution',
      message: "THis Feature is not available yet! . Keep a look in the future",
      buttons: ['OK']
    });

    await alert.present();
  }

}
