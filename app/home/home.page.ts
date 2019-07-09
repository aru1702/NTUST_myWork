import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PreferenceManagerService } from '../services/preference-manager.service';
import { StaticVariable } from '../classes/static-variable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor (
    private navCtrl: NavController,
    private pref: PreferenceManagerService
  ) {
    this.main();
  }

  async main () {
    await this.checkPrefFirstTime();
  }

  ionViewDidEnter () {
    this.checkSession();
  }

  async checkPrefFirstTime () {
    
    // in here check the first time when app opened
    let a = await this.pref.getData(StaticVariable.KEY__CHECK_PREF_CREATED);
    if (a === null || a === undefined) {

      // create some first
      await this.pref.saveData(StaticVariable.KEY__CHECK_PREF_CREATED, true);
      await this.pref.saveData(StaticVariable.KEY__LAST_DATE, new Date());
      await this.pref.saveData(StaticVariable.KEY__LAST_PAGE, null);
      await this.pref.saveData(StaticVariable.KEY__MAINTENANCE_PROGRESS__DEVICE_ID, null);
      await this.pref.saveData(StaticVariable.KEY__NEARBY_DISPENSER__DEVICE_ID, null);
      await this.pref.saveData(StaticVariable.KEY__SESSION_ID, null); 
    }
  }

  async checkSession() {

    // check session ID and date
    let nowDate = new Date();
    let lastDate = await this.pref.getData(StaticVariable.KEY__LAST_DATE)
    let difDate = nowDate.getTime() - lastDate.getTime();

    // // check in console
    //   console.log("Now date: " + nowDate);
    //   console.log("Last date: " + lastDate);
    //   console.log("Difference: " + difDate);
    //   console.log("Session ID: " + await this.pref.getData(StaticVariable.KEY__SESSION_ID));

    if (await this.pref.checkData(StaticVariable.KEY__SESSION_ID, null)) {
    
      // direct the user to login page
      this.navCtrl.navigateForward(['login']);
      
    } else if (difDate > StaticVariable.SESSION_TIMEOUT) {
    
      // direct the user to login page
      this.navCtrl.navigateForward(['login']);
      
      // remove the session ID from preference
      this.pref.removeData(StaticVariable.KEY__SESSION_ID);

      // save the name of page
      this.pref.saveData(StaticVariable.KEY__LAST_PAGE, "home");
    } else {
     
      // save new Date
      this.pref.saveData(StaticVariable.KEY__LAST_DATE, nowDate);
    }
    
  }

  login() {
    this.navCtrl.navigateForward(['login']); 
  }

  register() {
    this.navCtrl.navigateForward(['register']); 
  }

  nearby() {
    this.navCtrl.navigateForward(['to-nearby']);
  }

  mtProgress() {
    this.navCtrl.navigateForward(['to-mt-progress']);
  }

}
