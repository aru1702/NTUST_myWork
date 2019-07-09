import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'

import { PreferenceManagerService } from 'src/app/services/preference-manager.service';
import { StaticVariable } from 'src/app/classes/static-variable';
import { DispenserAPIService } from 'src/app/services/dispenser-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private navCtrl: NavController,

    private pref: PreferenceManagerService,
    private api: DispenserAPIService
    ) { }

  ngOnInit() {
  }

  async login() {
    const { email, password } = this;

    let resultData = await this.api.loginUser(email, password);
    console.log(resultData);

    if (resultData === true) {

      // save the email into session_id
      await this.pref.saveData(StaticVariable.KEY__SESSION_ID, email);
      
      // save the date into last_date
      let nowDate = new Date();
      await this.pref.saveData(StaticVariable.KEY__LAST_DATE, nowDate);

      // get last page if exists
      let lastPage = await this.pref.getData(StaticVariable.KEY__LAST_PAGE);
        // console.log(lastPage);
      if (lastPage === null) {

        // if null route to home
        this.router.navigate(['home']);

      } else {

        // delete last_page from preference
        await this.pref.removeData(StaticVariable.KEY__LAST_PAGE);

        //   console.log("Go to: " + lastPage);
        // this.router.navigate([lastPage]);
        this.navCtrl.back();
      }

      console.log("Login successed!");

    } else {
      console.log("The email or password is incorrect!");
    }

  }

  registerlink() {
    this.router.navigate(['register']); 
  }

  // async saveSession(id) {
  //   await this.pref.saveData(StaticVariable.KEY__SESSION_ID, id);
  // }

  // async saveLastDate(date) {
  //   await this.pref.saveData(StaticVariable.KEY__LAST_DATE, date);
  // }
}
