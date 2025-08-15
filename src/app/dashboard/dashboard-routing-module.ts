import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';

import { authGuard } from '../core/guards/auth-guard-guard';
import { DashboardLanding } from './components/dashboard-landing/dashboard-landing';
import { DashboardProperties } from './components/dashboard-properties/dashboard-properties';
import { AddProperty } from './components/dashboard-properties/add-property/add-property';
import { UpdateProperty } from './components/dashboard-properties/update-property/update-property';
import { PropertyDetails } from './components/dashboard-properties/property-details/property-details';
import { Customers } from './components/customers/customers';
import { AddEditeCustomer } from './components/customers/add-edite-customer/add-edite-customer';
import { AddNewCustomer } from './components/customers/add-new-customer/add-new-customer';
import { EditeCustomer } from './components/customers/edite-customer/edite-customer';
import { CustomerDetails } from './components/customers/customer-details/customer-details';
import { Categories } from './components/categories/categories';

const routes: Routes = [

  {
    path: '', component: DashboardLayout,
    children: [

      { path: '', component: DashboardLanding, canActivate: [authGuard] },
      { path: 'manage-properties', component: DashboardProperties, canActivate: [authGuard] },
      { path: 'manage-properties/add-property', component: AddProperty, canActivate: [authGuard] },
      { path: 'manage-properties/edit/:propertyId', component: UpdateProperty, canActivate: [authGuard] },
      { path: 'manage-properties/details/:propertyId', component: PropertyDetails, canActivate: [authGuard] },
      { path: 'customers', component: Customers, canActivate: [authGuard] },
      { path: 'customers/add', component: AddNewCustomer, canActivate: [authGuard] },
      { path: 'customers/edit/:customerId', component: EditeCustomer, canActivate: [authGuard] },
      { path: 'customers/details/:customerId', component: CustomerDetails, canActivate: [authGuard] },
      { path: 'categories', component: Categories, canActivate: [authGuard] },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
