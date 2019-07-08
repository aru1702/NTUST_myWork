import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { PreferenceManagerService } from '../services/preference-manager.service';
import { StaticVariable } from '../class/static-variable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  token : any = "";

  constructor (
    private router: Router,
    private http: HttpClient,

    private pref: PreferenceManagerService
  ) {
    this.main();
  }

  async main () {
    
    // check session ID and date
    let nowDate = new Date();
    let lastDate = await this.pref.getData(StaticVariable.KEY__LAST_DATE)
    let difDate = nowDate.getTime() - lastDate.getTime();

    console.log(nowDate);
    console.log(lastDate);
    console.log(difDate);
    console.log(await this.pref.getData(StaticVariable.KEY__SESSION_ID));

    if (await this.pref.checkData(StaticVariable.KEY__SESSION_ID, null)) {
      this.router.navigate(['login']);
    }

    if (difDate > StaticVariable.SESSION_TIMEOUT) {
      this.router.navigate(['login']);
      
      this.pref.removeData(StaticVariable.KEY__SESSION_ID);

      this.pref.saveData(StaticVariable.KEY__LAST_PAGE, 'home');
    }
  }

  login() {
    this.router.navigate(['login']); 
  }

  register() {
    this.router.navigate(['register']); 
  }

  reset() {
    this.router.navigate(['reset']); 
  }

  record() {
    this.router.navigate(['records']); 
  }

  nearby() {
    this.router.navigate(['to-nearby']);
  }

  mtProgress() {
    this.router.navigate(['to-mt-progress']);
  }

  async gettoken() {
    let postData = {
      "UserName": "pwa_user001",
      "Password": "password"
    }

    this.http.post("https://smartcampus.et.ntust.edu.tw:5425/Login", postData)
      .subscribe(data => {
        console.log(data['token']);
        this.token = data['token'];
       }, error => {
        console.log(error);
      });
  }
}
