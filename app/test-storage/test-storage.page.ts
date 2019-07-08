import { Component, OnInit } from '@angular/core';
import { PreferenceManagerService } from '../services/preference-manager.service';
import { StaticVariable } from '../classes/static-variable';

@Component({
  selector: 'app-test-storage',
  templateUrl: './test-storage.page.html',
  styleUrls: ['./test-storage.page.scss'],
})
export class TestStoragePage implements OnInit {

  constructor(
    private srvPref: PreferenceManagerService
  ) { }

  ngOnInit() {
    this.main();
  }

  async main () {
    
    let key = "myKey";
    let data = "Hello World"
    let data2 = "HelloWorld";

    console.log("Save into preference");
    console.log("Key name: " + StaticVariable.KEY__SESSION_ID);
    key = StaticVariable.KEY__SESSION_ID;
    await this.srvPref.saveData(key, data).then((onSuccess) => {
      console.log("Success! " + onSuccess);
    }, (onFailed) => {
      console.error("Failed! " + onFailed);
    });

    console.log("Get data from preference service");
    await this.srvPref.getData(key).then((onSuccess) => {
      console.log(onSuccess);
    }, (onFailed) => {
      console.error(onFailed);
    });

    // console.log("Save into preference service");
    // await this.srvPref.saveData(key, data).then((onSuccess) => {
    //   console.log("Success! " + onSuccess);
    // }, (onFailed) => {
    //   console.error("Failed! " + onFailed);
    // });

    // console.log("Get data from preference service");
    // await this.srvPref.getData(key).then((onSuccess) => {
    //   console.log(onSuccess);
    // }, (onFailed) => {
    //   console.error(onFailed);
    // });

    // console.log("Check if data is same with " + data);
    // await this.srvPref.checkData(key, data).then((onSuccess) => {
    //   console.log(onSuccess);
    // }, (onFailed) => {
    //   console.error(onFailed);
    // });

    // console.log("Check if data is same with " + data2);
    // await this.srvPref.checkData(key, data2).then((onSuccess) => {
    //   console.log(onSuccess);
    // }, (onFailed) => {
    //   console.error(onFailed);
    // });

    // console.log("Remove value from preference service");
    // await this.srvPref.removeData(key).then((onSuccess) => {
    //   console.log(onSuccess);
    // }, (onFailed) => {
    //   console.error(onFailed);
    // });

    // console.log("Get data after remove");
    // await this.srvPref.getData(key).then((onSuccess) => {
    //   console.log(onSuccess);
    // }, (onFailed) => {
    //   console.error(onFailed);
    // });

  }

}
