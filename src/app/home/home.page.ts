import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; // import Router from @angular/router
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    public actionSheetController: ActionSheetController,
    private apis: ApiService
  ) { // private member of Router

  }
  currentPageUrl;

  header = 'Updates';
  color_off = '#fff';
  color_on = 'primary';
  icon_set_off: string[] = ['calendar-outline', 'wallet-outline', 'help-buoy-outline', 'information-circle-outline'];
  icon_set_on: string[] = ['calendar', 'wallet', 'help-buoy', 'information-circle'];

  tab_1: string[] = [this.icon_set_off[0], this.color_off];
  tab_2: string[] = [this.icon_set_off[1], this.color_off];
  tab_3: string[] = [this.icon_set_off[2], this.color_off];
  tab_4: string[] = [this.icon_set_off[3], this.color_off];

  set_selected_tab(tab) {
    if (tab == 1) {
      this.tab_1[0] = this.icon_set_on[tab - 1]; this.tab_1[1] = this.color_on;
      this.header = 'Updates';
      this.tab_2[0] = this.icon_set_off[1]; this.tab_2[1] = this.color_off;
      this.tab_3[0] = this.icon_set_off[2]; this.tab_3[1] = this.color_off;
      this.tab_4[0] = this.icon_set_off[3]; this.tab_4[1] = this.color_off;
    }

    if (tab == 2) {
      this.tab_2[0] = this.icon_set_on[tab - 1]; this.tab_2[1] = this.color_on;
      this.header = 'Account';
      this.tab_3[0] = this.icon_set_off[2]; this.tab_3[1] = this.color_off;
      this.tab_4[0] = this.icon_set_off[3]; this.tab_4[1] = this.color_off;
      this.tab_1[0] = this.icon_set_off[0]; this.tab_1[1] = this.color_off;
    }
    if (tab == 3) {
      this.tab_3[0] = this.icon_set_on[tab - 1]; this.tab_3[1] = this.color_on;
      this.header = 'Support';
      this.tab_4[0] = this.icon_set_off[3]; this.tab_4[1] = this.color_off;
      this.tab_2[0] = this.icon_set_off[1]; this.tab_2[1] = this.color_off;
      this.tab_1[0] = this.icon_set_off[0]; this.tab_1[1] = this.color_off;
    }

    if (tab == 4) {
      this.tab_4[0] = this.icon_set_on[tab - 1]; this.tab_4[1] = this.color_on;
      this.header = 'About';
      this.tab_1[0] = this.icon_set_off[0]; this.tab_1[1] = this.color_off;
      this.tab_2[0] = this.icon_set_off[1]; this.tab_2[1] = this.color_off;
      this.tab_3[0] = this.icon_set_off[2]; this.tab_3[1] = this.color_off;
    }

  }
  profile(){
    this.router.navigateByUrl('profile');
  }

  async presentOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Profile',
        icon: 'person-outline',
        handler: () => {
          this.profile();
        }
      },
      {
        text: 'Send Update',
        icon: 'notifications-outline',
        handler: () => {
          this.router.navigateByUrl('push');
        }
      },
      {
        text: 'Logout',
        icon: 'log-out-outline',
        handler: () => {
          this.apis.logout();
        }
      }
      , {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  ngOnInit() {
    this.tab_1 = [this.icon_set_off[0], this.color_off];
    this.tab_2 = [this.icon_set_off[1], this.color_off];
    this.tab_3 = [this.icon_set_off[2], this.color_off];
    this.tab_4 = [this.icon_set_off[3], this.color_off];
  }

}
