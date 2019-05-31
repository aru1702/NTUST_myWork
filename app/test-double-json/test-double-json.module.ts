import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestDoubleJSONPage } from './test-double-json.page';

const routes: Routes = [
  {
    path: '',
    component: TestDoubleJSONPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestDoubleJSONPage]
})
export class TestDoubleJSONPageModule {}
