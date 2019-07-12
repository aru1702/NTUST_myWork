import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'nearby', loadChildren: './nearby/nearby.module#NearbyPageModule' },
  { path: 'test-double-json', loadChildren: './test-double-json/test-double-json.module#TestDoubleJSONPageModule' },
  { path: 'alldetail', loadChildren: './alldetail/alldetail.module#AlldetailPageModule' },
  { path: 'to-nearby', loadChildren: './to-nearby/to-nearby.module#ToNearbyPageModule' },
  { path: 'mt-progress', loadChildren: './mt-progress/mt-progress.module#MtProgressPageModule' },
  { path: 'to-mt-progress', loadChildren: './to-mt-progress/to-mt-progress.module#ToMtProgressPageModule' },
  { path: 'test-progress-json', loadChildren: './test-progress-json/test-progress-json.module#TestProgressJsonPageModule' },
  { path: 'test-nested', loadChildren: './test-nested/test-nested.module#TestNestedPageModule' },
  { path: 'test-storage', loadChildren: './test-storage/test-storage.module#TestStoragePageModule' },
  { path: 'test-report', loadChildren: './test-report/test-report.module#TestReportPageModule' },
  { path: 'test-pause', loadChildren: './test-pause/test-pause.module#TestPausePageModule' },  { path: 'test-dispenser-api', loadChildren: './test-dispenser-api/test-dispenser-api.module#TestDispenserAPIPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
