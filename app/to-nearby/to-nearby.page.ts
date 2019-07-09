import { Component, OnInit } from '@angular/core';
// import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PreferenceManagerService } from '../services/preference-manager.service';
import { StaticVariable } from '../classes/static-variable';

@Component({
  selector: 'app-to-nearby',
  templateUrl: './to-nearby.page.html',
  styleUrls: ['./to-nearby.page.scss'],
})
export class ToNearbyPage implements OnInit {

  private Device_ID;

  constructor(
    // public router: Router

    private navCtrl: NavController,
    private pref: PreferenceManagerService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }

  async D2_04_01(){
    // const { Device_ID } = this;
    // let navExtra: NavigationExtras = {
    //   state: {
    //     Device_ID: "D2_04_01"
    //   }
    // };

    this.Device_ID = "D2_04_01";

    // this.router.navigate(['nearby'], navExtra);
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['nearby']);
  }

  // inputId () {
  //   const { Device_ID } = this;
  //   let navExtra: NavigationExtras = {
  //     state: {
  //       Device_ID: Device_ID
  //     }
  //   };

  //   this.router.navigate(['nearby'], navExtra);
  // }

  // EE_01_01(){
  //   const { Device_ID } = this;
  //   let navExtra: NavigationExtras = {
  //     state: {
  //       Device_ID: "EE_01_01"
  //     }
  //   };

  //   this.router.navigate(['nearby'], navExtra);
  //   this.navCtrl.navigateForward(['nearby']);
  // }

  // D2_04_01(){
  //   const { Device_ID } = this;
  //   let navExtra: NavigationExtras = {
  //     state: {
  //       Device_ID: "D2_04_01"
  //     }
  //   };

  //   this.router.navigate(['nearby'], navExtra);
  // }

  // LB_04_01() {
  //   const { Device_ID } = this;
  //   let navExtra: NavigationExtras = {
  //     state: {
  //       Device_ID: "LB_04_01"
  //     }
  //   };

  //   this.router.navigate(['nearby'], navExtra);
  // }

  // MA_05_01(){
  //   const { Device_ID } = this;
  //   let navExtra: NavigationExtras = {
  //     state: {
  //       Device_ID: "MA_05_01"
  //     }
  //   };

  //   this.router.navigate(['nearby'], navExtra);
  // }

  // T4_06_01(){
  //   const { Device_ID } = this;
  //   let navExtra: NavigationExtras = {
  //     state: {
  //       Device_ID: "T4_06_01"
  //     }
  //   };

  //   this.router.navigate(['nearby'], navExtra);
  // }
  
}
