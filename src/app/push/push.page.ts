import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController
  ) {

  }

  regForm: FormGroup; submitted = false; setError: string;

  ngOnInit() {
    this.regForm = this.fb.group({
      priority: ['', Validators.required],
      topic: ['', Validators.required],
      type: ['', Validators.required],
      body: ['', Validators.required]
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
            'fname': data.data[0].usr_fname
          })
        } else {
          loading.dismiss();
          this.presentToast(data.msg);
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
        await loading.present();
        this.apis.update_user(
          dataset.email,
          dataset.password,
          dataset.lname,
          dataset.fname
        ).subscribe(
          data => {
            if (data.status == 0) {
              loading.dismiss();
              this.presentToast(data.msg);
              //console.log(data);
            } else {
              loading.dismiss();
              this.presentToast(data.msg);
            }
          }, error => {
            //console.log(error);
            loading.dismiss();
            this.presentToast("can't connect to server at the moment");
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