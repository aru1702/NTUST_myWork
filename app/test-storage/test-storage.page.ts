import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-test-storage',
  templateUrl: './test-storage.page.html',
  styleUrls: ['./test-storage.page.scss'],
})
export class TestStoragePage implements OnInit {

  // dictionary key
  DICTIONARY_KEY: string = "myPref";

  // test key for value
  KEY_1: string = "key1";

  // test value
  VALUE_1 = "aaa";
  VALUE_2 = 222;

  constructor(
    private storage: Storage
  ) { }

  ngOnInit() {
    this.main();
  }

  async main () {
    
    // set a key/value
    let a;
    await this.storage.set('name', 'Max').then((result) => {
      a = result;
    });
    console.log(a);

    // this.storage.get('name').then((val) => {
    //   console.log("My name: " + val);
    // });

    
  }

}
