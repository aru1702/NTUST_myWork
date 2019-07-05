import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-test-pause',
  templateUrl: './test-pause.page.html',
  styleUrls: ['./test-pause.page.scss'],
})
export class TestPausePage implements OnInit {

  a: Date = new Date(2019, 6, 5, 18, 1, 0, 0);
  b: Date;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {

  }

  clicked () {
    this.b = new Date();
    let result = this.b.getTime() - this.a.getTime();
    console.log("Different time: " + result);

    if (result > 60000) {
      this.router.navigate(['home']);
      console.log("Go Home!");
    }
  }
}
