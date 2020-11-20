import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AlertController, ToastController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { ToasterService } from '../../services/toaster.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apis: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toaster: ToasterService,
    private statusBar: StatusBar,


  ) { }

  loginForm: FormGroup; submitted = false; setError: string;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    width: 411,
    height: 200,
    autoplay: {
      delay: 5000,
    }
  };

  startAutoplay() {

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

  async resetPass() {
    let email = this.loginForm.get('email').value;
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Reset Password!',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Enter your Email',
          cssClass: 'specialClass',
          attributes: {
            inputmode: 'decimal',
            value: ''
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: async (data) => {
            const loading = await this.loadingCtrl.create({
              cssClass: 'my-custom-class',
              message: 'Please wait...',
            });
            if (data.email.length < 3) {
              this.presentAlert('Email Required');
            } else {
              await loading.present();
              this.apis.reset_Password(
                data.email
              ).subscribe(
                data => {
                  if (data.status == 0) {
                    loading.dismiss();
                    this.toaster.successToast(data.msg);
                    this.presentAlert('Password reseted check your emails for further instructions!')
                    console.log(data);
                  } else {
                    loading.dismiss();
                    this.presentAlert(data.msg);
                  }
                }, error => {
                  loading.dismiss();
                  this.presentAlert(error.message);
                }
              )
            }
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    if (localStorage.getItem('uuid')) {
      this.router.navigateByUrl('home/updates');
    }

    this.statusBar.overlaysWebView(true);

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }


  async login() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'logging in...',
    });
    let dataset = this.loginForm.value;

    if (dataset.email == '' || dataset.password == '') {
      this.presentAlert('All fields are requred!');
    } else if (!this.apis.validateEmail(dataset.email)) {
      this.presentAlert("Invalid Email inputed");
    } else {
      await loading.present();
      this.apis.login(
        dataset.email,
        dataset.password
      ).subscribe(
        data => {
          if (data.status == 0) {
            loading.dismiss();
            console.log(data);
            localStorage.setItem('uuid', data.data[0].usr_unique_id);
            localStorage.setItem('ur', data.data[0].usr_role);
            this.router.navigateByUrl('/home/updates');
          } else {
            loading.dismiss();
            this.presentToast(data.msg);
          }
        }, error => {
          //console.log(error);
          loading.dismiss();
          this.presentAlert('Couldnt reach server!\n, Check your internet connection');
        }
      )
    }


  }

  ionViewCanEnter() {

  }

  ionViewWillEnter() {
    if (localStorage.getItem('uuid')) {
      this.router.navigateByUrl('home/updates');
    }
  }

  revert() {
    // this.regForm.reset();
    this.router.navigateByUrl('login');
  }
}