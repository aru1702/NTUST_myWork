import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mt-progress',
  templateUrl: './mt-progress.page.html',
  styleUrls: ['./mt-progress.page.scss'],
})
export class MtProgressPage implements OnInit {

  items: any = [1, 2, 3,1,1,1,1,1,1,1];

  constructor() { }

  ngOnInit() {
  }

}
