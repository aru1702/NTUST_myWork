import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-to-mt-progress',
  templateUrl: './to-mt-progress.page.html',
  styleUrls: ['./to-mt-progress.page.scss'],
})
export class ToMtProgressPage implements OnInit {

  private Device_ID;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  inputId () {
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: Device_ID
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  EE_01_01(){
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "EE_01_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  D2_04_01(){
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "D2_04_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  LB_04_01() {
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "LB_04_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  MA_05_01(){
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "MA_05_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  T4_06_01(){
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "T4_06_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

}
