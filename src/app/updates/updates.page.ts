import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-updates',
  templateUrl: './updates.page.html',
  styleUrls: ['./updates.page.scss'],
})
export class UpdatesPage implements OnInit {

  constructor(
    private iab: InAppBrowser,
    private apis: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  searchText:any = '';
  filterText:any = '';

  filterOnclick(){
    console.log(this.filterText);
    this.searchText = this.filterText;
    this.get_updates();
  }

  ngOnInit() {
    this.get_updates();
  }

  updates: any[];

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  async get_updates() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    //await loading.present();
    this.apis.get_all_updates(this.searchText).subscribe(
      data => {
        if (data.status == 0) {
          //loading.dismiss();
          console.log(data.data);
          this.updates = data.data;
        } else {
          //loading.dismiss();
          this.presentAlert(data.msg);
        }
      }, error => {
        this.presentAlert(error);
      }
    )
  }

  launch_browser(link) {
    const browser = this.iab.create(link, '_blank');
    browser.show();
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });
  }

}
