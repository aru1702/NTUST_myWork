import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  email : string = "";
  password : string = "";
  repassword : string = "";

  constructor(private http: HttpClient) { }

  async signUp () {
    let token = "";
    const postDataToken = {
      "UserName": "pwa_user001",
      "Password": "password"
    }
    
    let getToken = await this.http.post(
      "https://smartcampus.et.ntust.edu.tw:5425/Login",
      postDataToken
    ).toPromise();
    
    token = getToken['token'];
    
    const { email, password, repassword } = this;
    const postDataRegister = {
      "Email" : email,
      "Password" : password
    }
    
    if (password != repassword) {
      console.log("Password not match!");
    } else {
      let httpOption = await {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        })
      };
      console.log(httpOption);
    
      this.http.post("https://smartcampus.et.ntust.edu.tw:5425/CreateUser", postDataRegister, httpOption)
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
      });
    }
  }
}
