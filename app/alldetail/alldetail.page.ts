import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-alldetail',
  templateUrl: './alldetail.page.html',
  styleUrls: ['./alldetail.page.scss'],
})
export class AlldetailPage implements OnInit {

  items : any = [];

  urlList = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/List';
  urlDetails = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Detail?Device_ID=';

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.main();
  }

  async main () {
    let myJson = await this.getDataList();

    // for every data in JsonArray
    for (let i = 0 ; i < myJson.length ; i++) {
      let device_id = myJson[i]['Device_ID'];
      // console.log(device_id);
      let myDetails;
      await this.getDetails(device_id).then((value) => {
        myDetails = value;
        // console.log(myDetails);
      });

      let deviceDetails = {
        'Device_ID': myDetails['Device_ID'],
        'Building': myDetails['Building'],
        'Position': myDetails['Position'],
        'Type': myDetails['Type']
      };

      this.items.push(deviceDetails);
    }
  }

  async getDataList () {
    let myJson = await this.http.get(this.urlList).toPromise();
    return myJson['Data'];
  }

  async getDetails(device_id) {
    let myUrl = this.urlDetails + device_id;
    let myJson = await this.http.get(myUrl).toPromise();

    // console.log(myUrl);
    // console.log(myJson);
    // console.log(myJson['Data']);

    return myJson['Data'];
  }

}
