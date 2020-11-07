import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


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
    public toastController: ToastController
  ) { }

  regForm: FormGroup; submitted = false; setError: string;

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

  ngOnInit() {
    if (localStorage.getItem('uuid')) {
      this.router.navigateByUrl('home/updates');
    }

    this.regForm = this.fb.group({
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
    await loading.present();
    let dataset = this.regForm.value;
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
      }
    )
  }

  ionViewWillEnter() {
    if(localStorage.getItem('uuid')){
      this.router.navigateByUrl('home/updates');
    }
  }

  revert() {
    // this.regForm.reset();
    this.router.navigateByUrl('login');
  }
}