import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-updates',
  templateUrl: './updates.page.html',
  styleUrls: ['./updates.page.scss'],
})
export class UpdatesPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
  }

  launch_browser(link){
    const browser = this.iab.create(link,'_blank');
    browser.show();
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
   });
  }
  
}
