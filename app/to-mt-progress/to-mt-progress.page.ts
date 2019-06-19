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

  E2_07_01(){
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "E2_07_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  MA_03_01(){
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "MA_03_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  RB_09_01() {
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "RB_09_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  T4_04_01(){
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "T4_04_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

  T4_07_01(){
    const { Device_ID } = this;
    let navExtra: NavigationExtras = {
      state: {
        Device_ID: "T4_07_01"
      }
    };

    this.router.navigate(['mt-progress'], navExtra);
  }

}