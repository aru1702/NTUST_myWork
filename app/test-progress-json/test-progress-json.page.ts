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

  async main () {
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

}
