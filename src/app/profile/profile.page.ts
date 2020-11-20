import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AlertController, ToastController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apis: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private toaster: ToasterService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,

  ) { }

  regForm: FormGroup; submitted = false; setError: string;

  ngOnInit() {
    this.regForm = this.fb.group({
      email: ['', Validators.required],
      lname: ['', Validators.required],
      fname: ['', Validators.required],
      cell: ['', Validators.required]
    });

    this.regForm.controls['email'].disable()
  }

  ionViewWillEnter() {
    this.get_user();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }

  async get_user() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    this.apis.get_user().subscribe(
      data => {
        if (data.status == 0) {
          loading.dismiss();
          console.log(data);
          this.regForm.setValue({
            'email': data.data[0].usr_email,
            'lname': data.data[0].usr_lname,
            'fname': data.data[0].usr_fname,
            'cell': data.data[0].usr_cell
          })
        } else {
          loading.dismiss();
          this.toaster.errorToast(data.msg);
        }
      }, error => {
        //console.log(error);
      }
    )
  }

  async update() {
    let dataset = this.regForm.value;
    if (dataset.lname && dataset.lname) {
      if (true) {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        });
        if(!this.apis.validateCell(dataset.cell) && dataset.cell.length != 10){
          this.presentAlert('Invalid Phone number');
        }else{
          await loading.present();
          this.apis.update_user(
            dataset.email,
            dataset.password,
            dataset.lname,
            dataset.fname,
            dataset.cell
          ).subscribe(
            data => {
              if (data.status == 0) {
                loading.dismiss();
                this.toaster.successToast(data.msg);
                //console.log(data);
              } else {
                loading.dismiss();
                this.toaster.errorToast(data.msg);
              }
            }, error => {
              //console.log(error);
              loading.dismiss();
              this.presentToast("can't connect to server at the moment");
            }
          )
        }
       
      } else {
        this.presentToast("Passwords Do not Match!");
      }
    } else {
      this.presentToast("Fill in All the fields!");
    }
  }

  async deregister() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>Delete account?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.doDeleteUser();
          }
        }
      ]
    });

    await alert.present();
  }

  async changePass() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Change Password!',
      inputs: [
        {
          name: 'pass',
          type: 'password',
          placeholder: 'New Password',
          cssClass: 'specialClass'
        },
        {
          name: 'pass1',
          type: 'password',
          placeholder: 'Confirm Password',
          cssClass: 'specialClass'
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
          handler: (data) => {
            this.doChangePassword(data.pass, data.pass1);
          }
        }
      ]
    });

    await alert.present();
  }

  async doChangePassword(password, password1) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });

    if (password == '' || password1 == '') {
      this.presentAlert('Password fields required');
    } else if (password1 != password) {
      this.presentAlert('Passwords do not match! ');
    } else {
      await loading.present();
      this.apis.update_password(password).subscribe(
        data => {
          if (data.status == 0) {
            loading.dismiss();
            this.toaster.successToast(data.msg);
          } else {
            loading.dismiss();
            this.presentAlert(data.msg);
          }
        }, error => {
          loading.dismiss();
          this.presentAlert(error.message);
        }
      );
    }
  }

  async doDeleteUser() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });

    await loading.present();
    this.apis.remove_user(localStorage.getItem('uuid')).subscribe(
      data => {
        if (data.status == 0) {
          loading.dismiss();
          this.toaster.successToast(data.msg);
          localStorage.clear();
        } else {
          loading.dismiss();
          this.presentAlert(data.msg);
        }
      }, error => {
        loading.dismiss();
        this.presentAlert(error.message);
      }
    );
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Air Food ✈️',
      subHeader: 'Warning',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  revert() {
    // this.regForm.reset();
    this.router.navigateByUrl('home/updates');
  }


}