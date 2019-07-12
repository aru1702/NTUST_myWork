import { Component, OnInit } from '@angular/core';
import { DispenserAPIService } from '../services/dispenser-api.service';

@Component({
  selector: 'app-test-dispenser-api',
  templateUrl: './test-dispenser-api.page.html',
  styleUrls: ['./test-dispenser-api.page.scss'],
})
export class TestDispenserAPIPage implements OnInit {

  /**
    * Define variable for multi-purpose, this means that each
    * testing can use the same variable without create new one
    * if not necessary.
    */
  myString: string = "";
  myNumber: number = -1;
  myBoolean: boolean = false;
  myJson: any = null;
  myObject: any = null;

  myImage: any = null;

  constructor(private api: DispenserAPIService) { }

  ngOnInit() {
    this.main();
  }

  async main () {
    
    // this.func1();
    // this.func2();
    // this.func3();
    // this.func4();
    // this.func5();
    // this.func6();
    // this.func7();
    // this.func8();
    // this.func9();
    // this.func10();
    // this.func11();
    this.func12();
    // this.func13();
    // this.func14();
    // this.func15();
  }

  // get Token
  async func1 () {

    console.log("Testing on getToken");

    this.myString = await this.api.getToken();
    
    console.log(this.myString);
  }

  // create/register new user
  async func2 () {

    console.log("Testing on createUser");
    
    let email1 = "muhamad_aldy17@yahoo.com";
    let email2 = "muhamad_aldy17@hotmail.com";
    let email3 = "muhamad.aldy@ui.ac.id";
    let password = "password";
    
    this.myBoolean = await this.api.registerNewUser(email1, password, password);
    console.log("With " + email1);
    console.log(this.myBoolean);

    this.myBoolean = await this.api.registerNewUser(email2, password, password);
    console.log("With " + email2);
    console.log(this.myBoolean);

    this.myBoolean = await this.api.registerNewUser(email3, password, password);
    console.log("With " + email3);
    console.log(this.myBoolean);

    console.log("Done!");
  }

  // login user with email+pass
  async func3 () {

    console.log("Testing on loginUser");

    let email1 = "muhamadaldy17@gmail.com";
    let email2 = "muhamad_aldy17@yahoo.com";
    let email3 = "muhamad_aldy17@hotmail.com";
    let password = "password";

    this.myBoolean = await this.api.loginUser(email1, password);
    console.log("With " + email1);
    console.log(this.myBoolean);

    this.myBoolean = await this.api.loginUser(email2, password);
    console.log("With " + email2);
    console.log(this.myBoolean);

    console.log("With \"then\" from Promise");
    await this.api.loginUser(email3, password).then((result) => {
      this.myBoolean = result;
    })
    console.log("With " + email3);
    console.log(this.myBoolean);

    console.log("Done!");
  }

  // get dispenser list
  async func4 () {
    console.log("Test get dispenser list");
    this.myJson = await this.api.getDispenserList();
    console.log(this.myJson);
    console.log("Done!");
  }

  // get nearby dispenser list
  async func5 () {
    let device_id = "MA_05_01";

    console.log("Test get nearby dispenser");
    this.myJson = await this.api.getNearbyDispenser(device_id);
    console.log(this.myJson);
    console.log("Done!");
    
  }

  // get dispenser picture
  async func6 () {
    let device_id = "MA_05_01";

    console.log("Test get dispenser figure");
    this.myImage = await this.api.getDispenserPicture(device_id);
    console.log(this.myImage);
    console.log("Done!");
  }

  // get dispenser picture url
  async func7 () {
    let device_id = "MA_05_01";

    console.log("Test get dispenser figure url only");
    this.myString = await this.api.getDispenserPictureUrlOnly(device_id);
    console.log(this.myString);
    console.log("Done!");
  }

  // get dispenser detail
  async func8 () {
    let device_id = "MA_05_01";

    console.log("Test get dispenser detail");
    this.myJson = await this.api.getDispenserDetail(device_id);
    console.log(this.myJson);
    console.log("Done!");
  }

  // get dispenser maintenance info
  async func9 () {
    let device_id = "MA_05_01";

    console.log("Test get dispenser maintenance info");
    this.myJson = await this.api.getDispenserMaintenance(device_id);
    console.log(this.myJson);
    console.log("Done!");
  }

  // get dispenser raw data
  async func10 () {
    let device_id = "MA_05_01";

    console.log("Test get dispenser raw data");
    this.myJson = await this.api.getDispenserRawData(device_id);
    console.log(this.myJson);
    console.log("Done!");
  }

  // get dispenser repair condition
  async func11 () {
    let device_id = "MA_05_01";

    console.log("Test get dispenser repair condition");
    this.myJson = await this.api.getDispenserRepairCondition(device_id);
    console.log(this.myJson);
    console.log("Done!");
  }

  // report problem
  async func12 () {
    let file : any = [];
    let device_id = "MA_04_03";
    let email = "muhamad_aldy17@hotmail.com";
    let errorType = 4;
    let description = "";

    console.log("Test reporting a problem");
    this.myBoolean = await this.api.reportProblem(file, device_id, email, errorType, description);
    console.log(this.myBoolean);
    console.log("Done!");
  }

  // update track
  async func13 () {
    let device_id = "MA_04_01";
    let email = "muhamad_aldy17@hotmail.com";
    let status = true;

    console.log("Test update track status = true");
    this.myBoolean = await this.api.wantUpdateTrack(device_id, email, status);
    console.log(this.myBoolean);
    console.log("Done!");
  }

  // get track status
  async func14 () {
    let device_id = "MA_05_01";
    let email = "muhamadaldy17@gmail.com";

    console.log("Test get track status");
    this.myJson = await this.api.checkTrackStatus(device_id, email);
    console.log(this.myJson);
    console.log("Done!");
  }

  // get repair info from Thingworx
  async func15 () {
    let status = 3;

    console.log("Test repair info from Thingworx");
    this.myJson = await this.api.getRepairThingworx(status);
    console.log(this.myJson);
    console.log("Done!");
  }
}
