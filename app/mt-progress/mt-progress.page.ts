import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mt-progress',
  templateUrl: './mt-progress.page.html',
  styleUrls: ['./mt-progress.page.scss'],
})
export class MtProgressPage implements OnInit {

  /**
   * API url list
   */
  urlGetRepair: string = "https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Repair?Device_ID=";

  /**
   * Array for details from Get Repair Condition
   * - Status
   * - ErrorType
   */
  arrayStatus: string[] = [
    "Waiting for confirmation",
    "Send error information to Union",
    "The repairment has been completed，and waits for validation",
    "Complete"
  ];

  arrayErrorType: string[] = [
    "Button does not respond",
    "Unable to emit water",
    "Leaking water",
    "Screen not shown"
  ];

  /**
   * field variable
   */
  items: any = [];
  
  // dummy device_id
  device_id: string = "RB_09_01";

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.main();
  }

  async main () {
    // get items from API

    // dummy data
    this.items = [
      {
        'UploadTime': new Date(2019, 3, 19, 11, 15, 0, 0),
        'UploadTimeString': "2019-04-19 11:15:00",
        'StatusNum': 4,
        'Status': this.arrayStatus[3],
        'ErrorTypeNum': 1,
        'ErrorType': this.arrayErrorType[0]
      },
      {
        'UploadTime': new Date(2019, 1, 13, 9, 15, 0, 0),
        'UploadTimeString': "2019-02-13 09:15:00",
        'StatusNum': 3,
        'Status': this.arrayStatus[2],
        'ErrorTypeNum': 1,
        'ErrorType': this.arrayErrorType[0]
      },
      {
        'UploadTime': new Date(2019, 0, 31, 15, 58, 0, 0),
        'UploadTimeString': "2019-01-31 15:58:00",
        'StatusNum': 2,
        'Status': this.arrayStatus[1],
        'ErrorTypeNum': 1,
        'ErrorType': this.arrayErrorType[0]
      },
      {
        'UploadTime': new Date(2019, 0, 15, 8, 37, 0, 0),
        'UploadTimeString': "2019-01-15 08:37:00",
        'StatusNum': 1,
        'Status': this.arrayStatus[0],
        'ErrorTypeNum': 1,
        'ErrorType': this.arrayErrorType[0]
      }
    ]

    // this.items = await this.getRepairCondition(this.device_id);

    // sort items array from the latest
    await this.sortFunction(this.items);

    // test to console
    console.log(this.items);
  }

  async sortFunction (myArray) {
    await myArray.sort((a, b) => {
      let dateA = new Date(a['UploadTime']), dateB = new Date(b['UploadTime']);
  
      if (dateB > dateA)
        return 1;
      if (dateB < dateA)
        return -1;

      return 0;
    });
  }

  async getRepairCondition (device_id: string) {
    const myUrl = this.urlGetRepair + device_id;

    let myJson = await this.http.get(myUrl).toPromise();
    let myData = myJson['Data'];

    let returnJson: any = [];

    for (let i = 0 ; i < myData.length ; i++) {
      let status: number = myData[i]['Status'];
      let statusString: string = this.arrayStatus[status - 1];

      let errorType: number = myData[i]['ErrorType'];
      let errorTypeString: string;
      if (errorType == 5) {
        errorTypeString = myData[i]['Description'];
      } else {
        errorTypeString = this.arrayErrorType[errorType - 1];
      }

      let uploadTime = await this.getTime(myData[i]['UploadTime']);

      let result = {
        'UploadTime': uploadTime,
        'UploadTimeString': myData[i]['UploadTime'],
        'StatusNum': status,
        'Status': statusString,
        'ErrorTypeNum': errorType,
        'ErrorType': errorTypeString
      };

      returnJson.push(result);
    }

    return returnJson;
  }

  getTime (time) {
    // time passed is String, construct into Date format
    // time example from json: "2019-03-08 16:32:00"
    // format: YEAR-MONTH-DATEOFMONTH HOUR:MINUTE:SECOND
    
    // split into DATE form and HOUR form
    let splitTime = time.split(" ");

    let resultDate = splitTime[0];
    let resultHour = splitTime[1];

    // split DATE into YEAR, MONTH, and DATEOFMONTH
    let splitDate = resultDate.split("-");

    let resultYear = splitDate[0];
    let resultMonth = splitDate[1] - 1;
    let resultDateOfMonth = splitDate[2];

    // split HOUR into HOUR, MINUTE, and SECOND
    let splitHour = resultHour.split(":");

    let resultHourC = splitHour[0];
    let resultMinute = splitHour[1];
    let resultSecond = splitHour[2];

    // now we get every component to construct date from String
    let newDate = new Date(
      resultYear,
      resultMonth,
      resultDateOfMonth,
      resultHourC,
      resultMinute,
      resultSecond,
      0
    );

    return newDate;
  }

}
