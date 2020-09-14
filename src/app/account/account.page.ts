import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private apis: ApiService
  ) { }

  Transaction = [];
  Balance;
  
  ngOnInit() {
    this.get_transactions();
    this.get_balance();
  }


  get_balance(){
    this.apis.get_balance(
      "'cf0dbec8-6407-4adf-84c8-65b9e95f5ea3'"
    ).subscribe(
      data => {
        
        if (data.code == 200) {
          this.Balance = data.result;
          console.log(this.Balance
          )
        } else {
          console.log("no transactions")
        }
      }, error => {
        console.log(error);
      }
    )
  }

  get_transactions(){
    this.apis.get_transactions(
      "cf0dbec8-6407-4adf-84c8-65b9e95f5ea3"
    ).subscribe(
      data => {
        
        if (data.code == 200) {
          this.Transaction = data.result;
        } else {
          console.log("no transactions")
        }
      }, error => {
        console.log(error);
      }
    )
  }


}
