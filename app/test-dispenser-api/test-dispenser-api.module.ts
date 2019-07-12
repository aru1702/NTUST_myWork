import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestDispenserAPIPage } from './test-dispenser-api.page';

const routes: Routes = [
  {
    path: '',
    component: TestDispenserAPIPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestDispenserAPIPage]
})
export class TestDispenserAPIPageModule {}
