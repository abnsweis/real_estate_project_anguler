import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';

import { authGuard } from '../core/guards/auth-guard-guard';
import { DashboardLanding } from './components/dashboard-landing/dashboard-landing';
import { DashboardProperties } from './components/dashboard-properties/dashboard-properties';
import { AddProperty } from './components/dashboard-properties/add-property/add-property';

const routes: Routes = [

  {
    path: '', component: DashboardLayout,
    children: [

      { path: '', component: DashboardLanding, canActivate: [authGuard] },
      { path: 'manage-properties', component: DashboardProperties, canActivate: [authGuard] },
      { path: 'manage-properties/add-property', component: AddProperty, canActivate: [authGuard] },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
