import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Sidebar } from './components/sidebar/sidebar';
import { StyleClass, StyleClassModule } from 'primeng/styleclass';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Ripple, RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { DrawerModule } from 'primeng/drawer';
import { Header } from './components/header/header';
import { DashboardStats } from './components/dashboard-stats/dashboard-stats';
import { StatCard } from './components/dashboard-stats/stat-card/stat-card';
import { RecentActivities } from './components/recent-activities/recent-activities';
import { Charts } from './components/charts/charts';
import { DashboardLanding } from './components/dashboard-landing/dashboard-landing';
import { RouterModule } from '@angular/router';
import { DashboardProperties } from './components/dashboard-properties/dashboard-properties';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { PropertyiesList } from './components/dashboard-properties/propertyies-list/propertyies-list';
import { Filtering } from './components/dashboard-properties/filtering/filtering';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { AddProperty } from './components/dashboard-properties/add-property/add-property';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { CardModule } from 'primeng/card';
import { FileUpload } from 'primeng/fileupload';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { UpdateProperty } from './components/dashboard-properties/update-property/update-property';
import { AddUpdateProperty } from './components/dashboard-properties/add-update-property/add-update-property';
import { TopSection } from './components/dashboard-properties/add-update-property/top-section/top-section';
import { PropertyDetails } from './components/dashboard-properties/property-details/property-details';
import { Rating } from 'primeng/rating';
import { SharedModule } from '../shared/shared-module';
import { Customers } from './components/customers/customers';
import { CustomersList } from './components/customers/customers-list/customers-list';
import { CustomersTable } from './components/customers/customers-list/table/table';
import { FilteringSection } from './components/customers/filtering-section/filtering-section';
import { InputGroupModule } from 'primeng/inputgroup';
import { TooltipModule } from 'primeng/tooltip';
import { AddNewCustomer } from './components/customers/add-new-customer/add-new-customer';
import { AddEditeCustomer } from './components/customers/add-edite-customer/add-edite-customer';
import { DatePickerModule } from 'primeng/datepicker';
import { EditeCustomer } from './components/customers/edite-customer/edite-customer';
import { CustomerDetails } from './components/customers/customer-details/customer-details';
import { TabsModule } from 'primeng/tabs';
import { PropertyStatusArPipe } from '../core/pipes/property-status-ar-pipe';
import { TransactionTypeArPipe } from '../core/pipes/transaction-type-ar-pipe';
import { CoverAndProfilePicture } from './components/customers/customer-details/cover-and-profile-picture/cover-and-profile-picture';
import { CustomerStats } from './components/customers/customer-details/customer-stats/customer-stats';
import { Tabs } from './components/customers/customer-details/tabs/tabs';
import { Categories } from './components/categories/categories';
import { CategoriesList } from './components/categories/categories-list/categories-list';
import { CategoriesTable } from './components/categories/categories-list/table/table';
import { CategoriesInfo } from './components/categories/categories-info/categories-info';
import { Dialog, DialogModule } from 'primeng/dialog';
import { Sales } from './components/transactions/sales/sales';
import { SaleCards } from './components/transactions/sales/sale-cards/sale-cards';
import { SaleDetails } from './components/transactions/sales/sale-details/sale-details';
import { Image } from 'primeng/image';
import { AddSale } from './components/transactions/sales/add-sale/add-sale';
import { ShortCustomerInfo } from '../shared/short-customer-info/short-customer-info';

@NgModule({
  declarations: [
    DashboardLayout,
    Sidebar,
    Header,
    DashboardStats,
    StatCard,
    RecentActivities,
    Charts,
    DashboardLanding,
    DashboardProperties,
    PropertyiesList,
    Filtering,
    AddProperty,
    TopSection,
    UpdateProperty,
    AddUpdateProperty,
    CategoriesTable,
    PropertyDetails,
    Customers,
    CustomersList,
    CustomersTable,
    FilteringSection,
    AddNewCustomer,
    AddEditeCustomer,
    EditeCustomer,
    CustomerDetails,
    CoverAndProfilePicture,
    CustomerStats,
    Tabs,
    Categories,
    CategoriesList,
    CategoriesInfo,
    Sales,
    SaleCards,
    SaleDetails,
    AddSale,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialog,
    Rating,
    Select,
    InputTextModule,
    FloatLabel,
    InputIcon,
    IconField,
    InputNumber,
    Fluid,
    CardModule,
    TextareaModule,
    MessageModule,
    FileUpload,
    DatePickerModule,
    SharedModule,
    TooltipModule,
    InputGroupModule,
    TabsModule,
    ShortCustomerInfo,
    PropertyStatusArPipe,
    TransactionTypeArPipe,
    Image,
    Dialog,
    DialogModule,
    DrawerModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule
  ]
})
export class DashboardModule { }
