import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  constructor(
    private apis: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }
  reports :any ;
  searchText:any = '';


  ngOnInit() {
    this.get_reports();
  }

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

  async get_reports() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    //await loading.present();
    this.apis.get_all_reports(this.searchText).subscribe(
      data => {
        if (data.status == 0) {
          //loading.dismiss();
          console.log(data.data);
          this.reports = data.data;
        } else {
          //loading.dismiss();
          this.presentAlert(data.msg);
        }
      }, error => {
        this.presentAlert(error);
      }
    )
  }

}
