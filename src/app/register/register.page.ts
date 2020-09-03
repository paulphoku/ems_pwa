import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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
      password1: ['', Validators.required],
      lname: ['', Validators.required],
      fname: ['', Validators.required],
    });
  }

  register() {
    let dataset = this.regForm.value;
    console.log('Email: ' + dataset.email + " Password: " + dataset.password);

    this.apis.register(
      dataset.email,
      dataset.password,
      dataset.lname,
      dataset.fname
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