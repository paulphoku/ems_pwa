import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; // import Router from @angular/router
import { ActionSheetController, AlertController, MenuController } from '@ionic/angular';
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
    private apis: ApiService,
    public alertController: AlertController,
    private menu: MenuController,

  ) { // private member of Router

  }

  currentPageUrl;
  role: any;

  header = 'Updates';
  color_off = 'light';
  color_on = 'primary';
  icon_set_off: string[] = ['calendar-outline', 'wallet-outline', 'help-buoy-outline', 'information-circle-outline'];
  icon_set_on: string[] = ['calendar', 'wallet', 'help-buoy', 'information-circle'];

  tab_1: string[] = [this.icon_set_off[0], this.color_off];
  tab_2: string[] = [this.icon_set_off[1], this.color_off];
  tab_3: string[] = [this.icon_set_off[2], this.color_off];
  tab_4: string[] = [this.icon_set_off[3], this.color_off];

  

  async  openMenu() {
    await this.menu.open();
  }

  async  closeMenu() {
    await this.menu.close();
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

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

 

  async presentOptions0() {
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

  async presentOptions1() {
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
        text: 'Reports',
        icon: 'document-text-outline',
        handler: () => {
          this.router.navigateByUrl('reports');
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
    this.tab_1[0] = this.icon_set_on[0]; this.tab_1[1] = this.color_on;
      this.header = 'Updates';
      this.tab_2[0] = this.icon_set_off[1]; this.tab_2[1] = this.color_off;
      this.tab_3[0] = this.icon_set_off[2]; this.tab_3[1] = this.color_off;
      this.tab_4[0] = this.icon_set_off[3]; this.tab_4[1] = this.color_off;
    this.role=localStorage.getItem('ur');
  }

  logout(){
    this.apis.logout();
  }

  ionViewWillEnter(){
    this.closeMenu();
    this.role=localStorage.getItem('ur');
  }

}
