import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.oneSignal.startInit(environment.onesignal.appId, environment.firebase.messagingSenderId);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe((data) => {
          // do something when notification is received
          //this.toaster.successToast(data.payload.body);
          //this.oneSignal.getIds;
        });
        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
        this.oneSignal.endInit();
      } else {

      }
  }

  ngOnInit() {

  }
}
