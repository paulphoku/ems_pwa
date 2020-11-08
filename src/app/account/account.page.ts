import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController, ToastController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private apis: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private alertCtrl: AlertController,
    private toaster: ToasterService,

  ) { }

  Transaction = [];
  Balance;

  ngOnInit() {
    this.get_transactions();
    this.get_balance();
  }

  async addBalanceAlert(msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'ERMS',
      subHeader: 'Payment',
      message: msg,
      inputs: [
        {
          name: 'amt',
          type: 'number',
          placeholder: 'R: Amount',
        },
        {
          name: 'card_holder',
          type: 'text',
          placeholder: 'Acount Holder',
        },
        {
          name: 'card_number',
          type: 'number',
          placeholder: 'XXXX-XXXX-XXXX-XXXX',
          min: 16,
          max: 16
        },
        {
          name: 'card_cvv',
          type: 'number',
          placeholder: 'CVV',
          min: 3,
          max: 4
        },
        {
          name: 'card_exp',
          type: 'month',
          placeholder: 'MM-YY',
          min: 2,
          max: 2
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (data) => {
            if(data.amt == '' || data.card_exp == '' || data.card_cvv == '' || data.card_holder == '' || data.card_number ==''){
              this.toaster.warnToast("fill in all the fields");
            }else{
              this.do_add_balance(data.amt);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async do_add_balance(amt) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    this.apis.add_balance(amt).subscribe(
      data => {
        if (data.status == 0) {
          loading.dismiss();
          this.toaster.successToast(data.msg);
          this.get_balance();
          this.get_transactions();
        } else {
          loading.dismiss();
          this.toaster.errorToast(data.msg);
        }
      }, error => {
        //console.log(error);
      }
    )
  }


  get_balance() {
    this.apis.get_balance(
    ).subscribe(
      data => {

        if (data.code == 200) {
          this.Balance = data.result;
          console.log(this.Balance
          )
        } else {
          console.log("no transactions")
        }
      }, error => {
        console.log(error);
      }
    )
  }

  get_transactions() {
    this.apis.get_transactions(
    ).subscribe(
      data => {

        if (data.code == 200) {
          this.Transaction = data.result;
          console.log(data.result);
        } else {
          console.log("no transactions")
        }
      }, error => {
        console.log(error);
      }
    )
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'EMRS',
      subHeader: 'Caution',
      message: "THis Feature is not available yet! . Keep a look in the future",
      buttons: ['OK']
    });

    await alert.present();
  }


}
