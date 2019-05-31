import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-double-json',
  templateUrl: './test-double-json.page.html',
  styleUrls: ['./test-double-json.page.scss'],
})
export class TestDoubleJSONPage implements OnInit {
  
  // API
  urlNearby = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Nearby?Device_ID=';
  urlDetails = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Detail?Device_ID=';
  urlPicture = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Image?Device_ID=';

  // field variables
    
    // this to store the whole data and call into HTML
    result : any = [];
    
    // this to store every data from the API
    device_id : String[] = [];
    status : String[] = [];
    building : String[] = [];
    position : String[] = [];
    picture : String[] = [];
    tempHot : String[] = [];
    tempWarm : String[] = [];
    tempCold : String[] = [];

  // dummy data
  device : String = "MA_B1_01";

  constructor(
    public http: HttpClient
  ) {
    this.getData();
  }

  ngOnInit() {
  }

  async getData () {

    await this.getNearby(this.device).then(() => {
      for (let i = 0 ; i < this.device_id.length ; i++) {

        // store all data into result field
        this.result.push({
          'Device_ID': this.device_id[i],
          'Status': this.status[i],
          'Building': this.building[i],
          'Position': this.position[i],
          'Picture': this.picture[i],
          'HotTemp': this.tempHot[i],
          'WarmTemp': this.tempWarm[i],
          'ColdTemp': this.tempCold[i],
        })
      };
    });

    console.log(this.result);

  }

  async getNearby (device_id) {
    let myUrl = this.urlNearby + device_id;

    let dataNearby = await this.http.get(myUrl).toPromise();
    let nearbyDispenser = dataNearby['Data'];
    
    if (nearbyDispenser != "") {

      for (let i = 0 ; i < nearbyDispenser.length ; i++){
        let myDeviceId = nearbyDispenser[i]['Device_ID'];
        let myStatus = nearbyDispenser[i]['Status'];
        let myTempHot = nearbyDispenser[i]['HotTemp'];
        let myTempWarm = nearbyDispenser[i]['WarmTemp'];
        let myTempCold = nearbyDispenser[i]['ColdTemp'];
        
        // get dispenser details
        await this.getDetails(myDeviceId);

        // get dispenser picture
        await this.getPicture(myDeviceId);

        // save data into field variable
        this.device_id.push(myDeviceId);
        this.status.push(myStatus);
        this.tempHot.push(myTempHot);
        this.tempWarm.push(myTempWarm);
        this.tempCold.push(myTempCold);
      }
    } else {
      console.log("Data not retrieved yet.")
    }
  }

  async getDetails (device_id) {
    let myUrl = this.urlDetails + device_id;

    let dataDetails = await this.http.get(myUrl).toPromise();
    let dispenserDetails = dataDetails['Data'];
    
    // get the building and position
    let getBuilding = dispenserDetails['Building'];
    let getPosition = dispenserDetails['Position'];

    // save into field variable
    this.building.push(getBuilding);
    this.position.push(getPosition);
  }

  async getPicture (device_id) {
    let myUrl = this.urlPicture + device_id;

    // here only get the url because the picture itself is so big
    let dataPicture = myUrl;

    // save into field variable
    this.picture.push(dataPicture);
  }

}