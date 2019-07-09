import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PreferenceManagerService } from '../services/preference-manager.service';
import { StaticVariable } from '../classes/static-variable';

@Component({
  selector: 'app-to-mt-progress',
  templateUrl: './to-mt-progress.page.html',
  styleUrls: ['./to-mt-progress.page.scss'],
})
export class ToMtProgressPage implements OnInit {

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

    let currentPage = "to-mt-progress";

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
    this.navCtrl.navigateForward(['mt-progress']);
  }

  async E2_07_01 () {
    this.Device_ID = "E2_07_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['mt-progress']);
  }

  async MA_03_01 () {
    this.Device_ID = "MA_03_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['mt-progress']);
  }

  async RB_09_01 () {
    this.Device_ID = "RB_09_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['mt-progress']);
  }

  async T4_04_01 () {
    this.Device_ID = "T4_04_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['mt-progress']);
  }

  async T4_07_01 () {
    this.Device_ID = "T4_07_01";
    await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, this.Device_ID);
    this.navCtrl.navigateForward(['mt-progress']);
  }

}