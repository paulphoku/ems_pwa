import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToasterService } from '../../services/toaster.service';
import { AlertController, PickerController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private router: Router,
    private toaster: ToasterService

  ) { }

  verifiedUsers: any[];
  nonVerifiedUsers: any[];
  searchUsers: any[];
  all_users: any[];
  users: any[];
  searchText: any = '';
  count = 0;

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.api.get_all_users(this.searchText).subscribe(
      data => {
        if (data.status == 0) {
          this.users = data.data;
          this.count = data.data.length
          console.log(data.data);
        } else {
          this.presentAlert(data.msg);
        }
      }, error => {
        this.presentAlert(error.message);
      }
    );
  }



  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'ERMS',
      subHeader: 'Warning',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async userAlert(email: string, uuid: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Air Food ✈️',
      subHeader: 'User :' + email,
      message: '',
      buttons: [
        {
          text: 'Register as Normal User',
          role: 'Danger',
          cssClass: 'secondary',
          handler: () => {
            this.register_admin(uuid, 'normal');
          }
        }, {
          text: 'Register as Admin',
          handler: () => {
            this.register_admin(uuid, 'admin');
          }
        },
        {
          text: 'Delete user',
          handler: () => {
            this.delete_user(uuid);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }

  register_admin(uuid, ur) {
    this.api.register_as_admin(uuid, ur).subscribe(
      data => {
        if (data.status == 0) {
          this.toaster.successToast(data.msg);
          this.init();
        } else {
          this.presentAlert(data.msg);
        }
      }, error => {
        this.presentAlert(error.message);
      }
    );
  }

  delete_user(uuid) {
    this.api.remove_user(uuid).subscribe(
      data => {
        if (data.status == 0) {
          this.toaster.successToast(data.msg);
          this.init();
          this.count -= 1;
        } else {
          this.presentAlert(data.msg);
        }
      }, error => {
        this.presentAlert(error.message);
      }
    );
  }
}



