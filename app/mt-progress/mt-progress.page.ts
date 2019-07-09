import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { PreferenceManagerService } from '../services/preference-manager.service';
import { StaticVariable } from '../classes/static-variable';

@Component({
  selector: 'app-mt-progress',
  templateUrl: './mt-progress.page.html',
  styleUrls: ['./mt-progress.page.scss'],
})
export class MtProgressPage implements OnInit {

  // API url
  urlGetRepair: string = "https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Repair?Device_ID=";
  urlPicture: string = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Image?Device_ID=';

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

  items: any = [];
  device_id: string = "";
  KEY_DEVICE_ID: string = "device_id";
  isDeviceIdExists: boolean = false;
  backgroundImg: any;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public toastCtrl: ToastController,

    private storage: Storage,
    private pref: PreferenceManagerService
  ) {
    /**
     * getting params from previous page under name "Device_ID"
     * any page previous of this should pass params under the same name
     */
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.device_id = this.router.getCurrentNavigation().extras.state.Device_ID;
        this.isDeviceIdExists = true;
      }
    });
  }

  ngOnInit() {
    this.checkSession();
    // this.storeDeviceId(this.device_id);
    console.log(this.isDeviceIdExists);
    this.main();
  }

  async main () {
    await this.prefDeviceId();

    // get items from API
    this.items = await this.getRepairCondition(this.device_id);

    // set image
    this.backgroundImg = await this.getPicture(this.device_id);
    console.log(this.backgroundImg);

    // sort items array from the latest
    await this.sortFunction(this.items);

    // test to console
    // console.log(this.items);
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

  /**
   * this method is for getting the picture of the dispenser
   * 
   * @param   device_id id of the dispenser
   */
  async getPicture (device_id) {
    let myUrl = this.urlPicture + device_id;
    return myUrl;
  }

  async prefDeviceId () {
    
    // if the device ID is passed
    // set preferences
    if (this.isDeviceIdExists) {
      await this.storage.set(this.KEY_DEVICE_ID, this.device_id).then((success) => {
        console.log("Set device id: " + success + " is success!");
      }).catch((failed) => {
        console.error("Error while storing: " + failed);
      });
    }
    
    // or if not, when page reloaded without going to previous page
    // get from preferences
    else {
      await this.storage.get(this.KEY_DEVICE_ID).then((result) => {
        this.device_id = result;
        console.log("Load device id: " + result + " is success!");
      });
    }
  }

  // async storeDeviceId (device_id: string) {
  //   this.storage.set(this.KEY_DEVICE_ID, device_id).then((result) => {
  //     console.log(result);
  //     console.log("Key under " + this.KEY_DEVICE_ID + " with value " + device_id + " is successfully stored");
  //   });
  // }

  async checkSession() {
    
    // check session ID and date
    let nowDate = new Date();
    let lastDate = await this.pref.getData(StaticVariable.KEY__LAST_DATE)
    let difDate = nowDate.getTime() - lastDate.getTime();

    // check in console
      // console.log(nowDate);
      // console.log(lastDate);
      // console.log(difDate);
      // console.log(await this.pref.getData(StaticVariable.KEY__SESSION_ID));

    if (await this.pref.checkData(StaticVariable.KEY__SESSION_ID, null)) {

      // direct the user to login page
      this.router.navigate(['login']);
      
    } else if (difDate > StaticVariable.SESSION_TIMEOUT) {

      // direct the user to login page
      this.router.navigate(['login']);
      
      // remove the session ID from preference
      this.pref.removeData(StaticVariable.KEY__SESSION_ID);

      // save the name of page
      this.pref.saveData(StaticVariable.KEY__LAST_PAGE, "mt-progress");
    } else {

      // save new Date
      this.pref.saveData(StaticVariable.KEY__LAST_DATE, nowDate);
    }
  }

}
