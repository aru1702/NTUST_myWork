import { Component, OnInit } from '@angular/core';
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
    private navCtrl: NavController,
    private pref: PreferenceManagerService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.checkSession();
  }

  async checkSession() {
    
    // check session ID and date
    let nowDate = new Date();
    let lastDate = await this.pref.getData(StaticVariable.KEY__LAST_DATE)
    let difDate = nowDate.getTime() - lastDate.getTime();

    // check if there any session ID
    let checkData = await this.pref.checkData(StaticVariable.KEY__SESSION_ID, null);

    let currentPage = "to-nearby";

    // check in console
      console.log(nowDate);
      console.log(lastDate);
      console.log(difDate);
      console.log(await this.pref.getData(StaticVariable.KEY__SESSION_ID));

    if (checkData) {

      // direct the user to login page
      this.navCtrl.navigateForward(['login']);
      
    } else if (difDate > StaticVariable.SESSION_TIMEOUT) {

      // direct the user to login page
      this.navCtrl.navigateForward(['login']);
      
      // remove the session ID from preference
      this.pref.removeData(StaticVariable.KEY__SESSION_ID);

      // save the name of page
      this.pref.saveData(StaticVariable.KEY__LAST_PAGE, currentPage);
    } else if (!checkData && difDate <= StaticVariable.SESSION_TIMEOUT) {

      // save new Date
      this.pref.saveData(StaticVariable.KEY__LAST_DATE, nowDate);
    }
  }

  async inputId () {
    const { Device_ID } = this;
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['nearby']);
  }

  async EE_01_01 () {
    this.Device_ID = "EE_01_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['nearby']);
  }

  async D2_04_01 () {
    this.Device_ID = "D2_04_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['nearby']);
  }

  async LB_04_01 () {
    this.Device_ID = "LB_04_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['nearby']);
  }

  async MA_05_01 () {
    this.Device_ID = "MA_05_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['nearby']);
  }

  async T4_06_01 () {
    this.Device_ID = "T4_06_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['nearby']);
  }

  ///////////////////////////////////////

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
