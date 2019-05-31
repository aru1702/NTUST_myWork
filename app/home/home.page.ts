import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  token : any = "";

  constructor (
    private router: Router,
    private http: HttpClient) {}

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
    this.router.navigate(['nearby']);
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
