import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.page.html',
  styleUrls: ['./test-report.page.scss'],
})
export class TestReportPage implements OnInit {

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.main();
  }

  async main () {
    let myFile = [];
    let myDevice_Id: string = "";
    let myEmail: string = "muhamadaldy17@gmail.com";
    let myErrorType = 2;
    let myDescription: string = "";

    let postData = {
      "File": myFile,
      "Device_Id": myDevice_Id,
      "Email": myEmail,
      "ErrorType": myErrorType,
      "Description": myDescription
    };

    console.log(postData);

    await this.http.post("https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Report", postData).subscribe((result) => {
      console.log(result);
    });
  }

}
