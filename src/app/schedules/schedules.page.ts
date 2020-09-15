import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {

  constructor(
    private _location: Location,
    private iab: InAppBrowser
    ) 
  {}

  backClicked() {
    this._location.back();
  }

  launch_browser(link){
    const browser = this.iab.create(link,'_blank');
    browser.show();
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ });
   });
  }

  ngOnInit() {
  }

}
