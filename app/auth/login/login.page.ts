import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { PreferenceManagerService } from 'src/app/services/preference-manager.service';
import { StaticVariable } from 'src/app/classes/static-variable';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";
  resultData;

  constructor(
    private http: HttpClient,
    private router: Router,
    private pref: PreferenceManagerService
    ) { }

  ngOnInit() {
  }

  async login() {
    const { email, password } = this;

    let postData = {
      "Email" : email,
      "Password" : password
    }

    this.resultData = await this.http.post("https://smartcampus.et.ntust.edu.tw:5425/UserLogin", postData).toPromise();

    console.log(this.resultData);

    if (this.resultData['code'] == 200) {
          
      // go to dashboard
      console.log("Login successed!")

      this.saveSession(email);
      
      let nowDate = new Date();
      this.saveLastDate(nowDate);

      this.router.navigate(['home']);
    } else {
      console.log("Login failed!")
    }

  }

  registerlink() {
    this.router.navigate(['register']); 
  }

  async saveSession(id) {
    await this.pref.saveData(StaticVariable.KEY__SESSION_ID, id);
  }

  async saveLastDate(date) {
    await this.pref.saveData(StaticVariable.KEY__LAST_DATE, date);
  }
}
