import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apis: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  regForm: FormGroup; submitted = false; setError: string;

  ngOnInit() {
    this.regForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password1: ['', Validators.required],
      lname: ['', Validators.required],
      fname: ['', Validators.required],
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

  async register() {
    let dataset = this.regForm.value;
    if(dataset.password && dataset.password1 && dataset.email && dataset.lname){
      if(dataset.password == dataset.password1){
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        });
        await loading.present();
        this.apis.register(
          dataset.email,
          dataset.password,
          dataset.lname,
          dataset.fname
        ).subscribe(
          data => {
            if (data.ststus == 0) {
              loading.dismiss();
              this.router.navigate(['/login']);
              //console.log(data);
            } else {
              loading.dismiss();
              this.presentToast(data.msg);
            }
          }, error => {
            //console.log(error);
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
    this.router.navigateByUrl('login');
  }
}