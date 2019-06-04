import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {

  // API
  urlNearby = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Nearby?Device_ID=';
  urlDetails = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Detail?Device_ID=';
  urlPicture = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Image?Device_ID=';

  // field
  public nearbySameBuilding = [];
  public nearbyNextBuilding = [];
  private tempSameBuilding = [];
  private tempNextBuilding = [];

  private onlyCold : boolean = false;
  private onlyWarm : boolean = false;
  private onlyHot : boolean = false;
  private resultDone: boolean = false;

  // dummy data for test
  dummyDeviceId: String = "MA_05_01";

  constructor(
    public http: HttpClient
  ) {  }

  /**
   * ngOnInit() is the function that called when page being loaded.
   * Like in many programming, it's like main function.
   * 
   * If want to use async function:
   * - create new function with async (ex: async myFunctionName() { } )
   * - call in here with "this.myFunctionName();"
   */
  ngOnInit() {
    this.main();
  }

  coldFilter () {
    if (this.resultDone) {
      if (!this.onlyCold)
        this.onlyCold = true;
      else
        this.onlyCold = false;
      
      this.conditionalFilter();
    }
    console.log(this.onlyCold);
  }
  
  warmFilter () {
    if (this.resultDone) {
      if (!this.onlyWarm)
        this.onlyWarm = true;
      else
        this.onlyWarm = false;
    }

    this.conditionalFilter();
    console.log(this.onlyWarm);
  }
  
  hotFilter () {
    if (this.resultDone) {
      if (!this.onlyHot)
        this.onlyHot = true;
      else
        this.onlyHot = false;
    }

    this.conditionalFilter();
    console.log(this.onlyHot);
  }

  /**
   * Parameter needed to be mapped into page:
   * - Device_ID    => getNearby(device_id), urlDetails(device_id)
   * - Status       => getNearby(device_id)
   * - HotTemp      => getNearby(device_id)
   * - WarmTemp     => getNearby(device_id)
   * - ColdTemp     => getNearby(device_id)
   * - Building     => getDetails(device_id)
   * - BuildingLoc  => getBuildingLocation (detailsJson) => for filtering
   * - Position     => getDetails(device_id)
   * - Picture      => getPicture(device_id)
   */
  async main () {
    let currentDispenserDetails = await this.getDetails(this.dummyDeviceId);
    let currentBuildingLocation = await this.getBuildingLocation(currentDispenserDetails);  
    let getNearbyDispenserJson = await this.getNearby(this.dummyDeviceId);
    
    for (let i = 0 ; i < getNearbyDispenserJson.length ; i++) {
      let dispenserId = getNearbyDispenserJson[i]['Device_ID'];
      let dispenserDetails = await this.getDetails(dispenserId);
      let dispenserPicture = await this.getPicture(dispenserId);

      let dispenserBuildingLoc = await this.getBuildingLocation(dispenserDetails);
      let tempAllDetails = {
        'Device_ID': dispenserId,
        'Status': getNearbyDispenserJson[i]['Status'],
        'HotTemp': getNearbyDispenserJson[i]['HotTemp'],
        'WarmTemp': getNearbyDispenserJson[i]['WarmTemp'],
        'ColdTemp': getNearbyDispenserJson[i]['ColdTemp'],
        'Building': dispenserDetails['Building'],
        'Position': dispenserDetails['Position'],
        'Picture': dispenserPicture
      };

      if (dispenserBuildingLoc == currentBuildingLocation) {
        this.tempSameBuilding.push(tempAllDetails);
      } else {
        this.tempNextBuilding.push(tempAllDetails);
      }

      // if (dispenserBuildingLoc == currentBuildingLocation) {
      //   this.nearbySameBuilding.push(tempAllDetails);
      // } else {
      //   this.nearbyNextBuilding.push(tempAllDetails);
      // }

    } // end FOR

    this.conditionalFilter();
  }

  async getNearby (device_id) {
    let myUrl = this.urlNearby + device_id;
    let myJson = await this.http.get(myUrl).toPromise();

    return myJson['Data'];
  }

  async getDetails (device_id) {
    let myUrl = this.urlDetails + device_id;
    let myJson = await this.http.get(myUrl).toPromise();
    
    return myJson['Data'];
  }

  async getPicture (device_id) {
    let myUrl = this.urlPicture + device_id;

    /**
     * @return  myImage  very big image
     */
    // let myImage = await this.http.get(myUrl).toPromise();
    // return myImage;

    /**
     * @return  myUrl  just url of the image
     */
    return myUrl;
  }

  async getBuildingLocation (detailsJson) {
    let myBuilding = detailsJson['Building'];
    let mbSplit = myBuilding.split(" ");
    let tempString = "";

    for (let i = 0 ; i < mbSplit.length - 1 ; i++) {
      tempString += mbSplit[i] + " ";
    }

    return tempString.trim();
  }

  conditionalFilter () {
    this.resultDone = false;

    this.nearbySameBuilding = this.tempSameBuilding;
    this.nearbyNextBuilding = this.tempNextBuilding;

    if (this.onlyCold) {
      this.nearbySameBuilding = this.nearbySameBuilding.filter((item) => {
        return item['ColdTemp'] > 0;
      });

      this.nearbyNextBuilding = this.nearbyNextBuilding.filter((item) => {
        return item['ColdTemp'] > 0;
      });
    }

    if (this.onlyWarm) {
      this.nearbySameBuilding = this.nearbySameBuilding.filter((item) => {
        return item['WarmTemp'] > 0;
      });

      this.nearbyNextBuilding = this.nearbyNextBuilding.filter((item) => {
        return item['WarmTemp'] > 0;
      });
    }

    if (this.onlyHot) {
      this.nearbySameBuilding = this.nearbySameBuilding.filter((item) => {
        return item['HotTemp'] > 0;
      });

      this.nearbyNextBuilding = this.nearbyNextBuilding.filter((item) => {
        return item['HotTemp'] > 0;
      });
    }

    this.resultDone = true;
  }
}