import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(private _location: Location) 
  {}

  backClicked() {
    this._location.back();
  }
  
  ngOnInit() {
  }

}
