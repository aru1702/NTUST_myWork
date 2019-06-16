import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ToMtProgressPage } from './to-mt-progress.page';

const routes: Routes = [
  {
    path: '',
    component: ToMtProgressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ToMtProgressPage]
})
export class ToMtProgressPageModule {}
