import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apis: ApiService
  ) { }

  regForm: FormGroup; submitted = false; setError: string;

  ngOnInit() {
    this.regForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  register() {
    let dataset = this.regForm.value;
    console.log('Email: ' + dataset.email + " Password: " + dataset.password);

    this.apis.login(
      dataset.email,
      dataset.password
    ).subscribe(
      data => {
        if (data.code == 200) {
          this.router.navigate(['/login']);
          console.log(data);
        } else {
          console.log(data);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  revert() {
    // this.regForm.reset();
    this.router.navigateByUrl('login');
  }
}