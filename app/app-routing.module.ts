import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'reset', loadChildren: './auth/reset/reset.module#ResetPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'records', loadChildren: './maintenance/records/records.module#RecordsPageModule' },
  { path: 'nearby', loadChildren: './nearby/nearby.module#NearbyPageModule' },
  { path: 'test-double-json', loadChildren: './test-double-json/test-double-json.module#TestDoubleJSONPageModule' },
  { path: 'alldetail', loadChildren: './alldetail/alldetail.module#AlldetailPageModule' },
  { path: 'to-nearby', loadChildren: './to-nearby/to-nearby.module#ToNearbyPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
