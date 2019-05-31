import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
  }

  async login() {
    const { email, password } = this;

    let postData = {
      "Email" : email,
      "Password" : password
    }
    this.http.post("https://smartcampus.et.ntust.edu.tw:5425/UserLogin", postData)
      .subscribe(data => {
        console.log(data);
        if (data['code'] == 200) {
          // go to dashboard
          console.log("Login successed!")
          this.router.navigate(['home']);
        } else {
          console.log("Login failed!")
        }
      }, error => {
        console.log(error);
    });
  }

  registerlink() {
    this.router.navigate(['register']); 
  }
}
