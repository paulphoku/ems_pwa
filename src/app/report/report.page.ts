import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apis: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  regForm: FormGroup; submitted = false; setError: string;

  ngOnInit() {
    this.regForm = this.fb.group({
      topic: ['', Validators.required],
      type: ['', Validators.required],
      body: ['', Validators.required],
      train:['', Validators.required]
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

  async update() {
    let dataset = this.regForm.value;
    if(dataset.train && dataset.type && dataset.topic && dataset.body){
      if(true){
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        });
        await loading.present();
        this.apis.add_report(
          dataset.train,
          dataset.type,
          dataset.topic,
          dataset.body
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
      }else{
        this.presentToast("Passwords Do not Match!");
      }
    }else{
      this.presentToast("Fill in All the fields!");
    }

   

  }

  revert() {
    // this.regForm.reset();
    this.router.navigateByUrl('home/support');
  }
}