import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-progress-json',
  templateUrl: './test-progress-json.page.html',
  styleUrls: ['./test-progress-json.page.scss'],
})
export class TestProgressJsonPage implements OnInit {

  /**
   * API url list
   */
  urlList: string = "https://smartcampus.et.ntust.edu.tw:5425/Dispenser/List";
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
  
  // test array
  dummy: any = [];
  dummy2: any = [];

  /**
   * Contructor of test-progress-json page
   * @param http : HttpClient   for GET and POST
   */
  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.main();  
  }

  async sortFunction (myArray) {
    await myArray.sort((a, b) => {
      let dateA = new Date(a['date']), dateB = new Date(b['date']);
  
      if (dateB > dateA)
        return 1;
      if (dateB < dateA)
        return -1;

      return 0;
    });

    return myArray;
  }

  async timeFunction () {
    let a;

    a = "2019-03-08 16:32:00";
    this.getTime(a);

    a = "2019-06-19 14:22:23";
    this.getTime(a);

    a = "2019-07-08 13:00:00"
    this.getTime(a);

    a = "2019-08-01 13:00:00"
    this.getTime(a);

    a = "2019-08-14 13:00:00"
    this.getTime(a);

    a = "2019-09-12 13:00:00"
    this.getTime(a);

    a = "2019-10-03 13:00:00"
    this.getTime(a);
  }

  async main () {
    ///////////////////
    // time function //
    ///////////////////
    await this.timeFunction();
    
    console.log("Before sort");
    console.log(this.dummy);

    /**
     * copy array value
     * this method is used because:
     * - if passing the array variable then that array will be execute,
     *   not array in variable inside the function
     * - if copy from one to another, it will only reference (pointing) to
     *   the same array, concept of object oriented programming
     */
    let dummyArray: any = [];
    for (let i = 0 ; i < this.dummy.length ; i++) {
      dummyArray[i] = this.dummy[i];
    }

    await this.sortFunction(dummyArray).then((value) => {
      this.dummy2 = value;
    });

    console.log("After sort");
    console.log(this.dummy2);

    ////////////////////////
    // dispenser function //
    ////////////////////////
    let myJson = await this.getAllDispenser();

    for (let i = 0 ; i < myJson.length ; i++) {
      let device_id = myJson[i]['Device_ID'];
      let myRepairCondition;

      await this.getRepairCondition(device_id).then((value) => {
        myRepairCondition = value;
      });

      let dispenserRepair;
      if (myRepairCondition.length > 0) {
        dispenserRepair = {
          'Device_ID': device_id,
          'RepairCondition': myRepairCondition
        };
        
        console.log(dispenserRepair);
        this.items.push(dispenserRepair);
      }
    }
  }

  async getAllDispenser () {
    let myJson = await this.http.get(this.urlList).toPromise();
    return myJson['Data'];
  }

  async getRepairCondition (device_id) {
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

      let result = {
        'UploadTime': myData[i]['UploadTime'],
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

    // console.log(newDate);
    let a = {'date': newDate};
    this.dummy.push(a);
  }

}
