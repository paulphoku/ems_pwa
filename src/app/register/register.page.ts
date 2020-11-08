import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AlertController, ToastController, LoadingController, MenuController, NavController } from '@ionic/angular';

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
    public toastController: ToastController,
    private alertCtrl: AlertController,

  ) { }

  regForm: FormGroup; submitted = false; setError: string;

  ngOnInit() {
    this.regForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password1: ['', Validators.required],
      lname: ['', Validators.required],
      fname: ['', Validators.required],
      cell: ['', Validators.required],
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
        if(!this.apis.validateCell(dataset.cell) && dataset.cell.length != 10){
          this.presentAlert('Invalid Phone number');
        }else if (!this.apis.validateEmail(dataset.email)) {
          this.presentAlert('Invalid email address');
        }else {
          await loading.present();
          this.apis.register(
            dataset.email,
            dataset.password,
            dataset.lname,
            dataset.fname,
            dataset.cell
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
        }
        
      }else{
        this.presentToast("Passwords Do not Match!");
      }
    }else{
      this.presentToast("Fill in All the fields!");
    }

   

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

  revert() {
    // this.regForm.reset();
    this.router.navigateByUrl('login');
  }
}