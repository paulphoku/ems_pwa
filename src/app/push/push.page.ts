import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-push',
  templateUrl: './push.page.html',
  styleUrls: ['./push.page.scss'],
})
export class PushPage implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apis: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {

  }

  regForm: FormGroup; submitted = false; setError: string;

  ngOnInit() {
    this.regForm = this.fb.group({
      priority: ['', Validators.required],
      topic: ['', Validators.required],
      link: ['', Validators.required],
      body: ['', Validators.required]
    });
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

  async send_push() {
    let dataset = this.regForm.value;
    if (dataset.topic && dataset.body && dataset.priority && dataset.link) {
      if (true) {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        });
        await loading.present();
        this.apis.send_update(
          dataset.topic, 
          dataset.body, 
          dataset.link, 
          dataset.priority
        ).subscribe(
          data => {
            if (data.status == 0) {
              loading.dismiss();
              this.presentToast(data.msg);
              //console.log(data);
            } else {
              loading.dismiss();
              this.presentAlert(data.msg);
            }
          }, error => {
            //console.log(error);
            loading.dismiss();
            this.presentAlert("can't connect to server at the moment");
          }
        )
      }
    } else {
      this.presentToast("Fill in All the fields!");
    }
  }

  revert() {
    // this.regForm.reset();
    this.router.navigateByUrl('home/support');
  }
}