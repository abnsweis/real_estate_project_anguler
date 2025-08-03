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
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { PropertyiesList } from './components/dashboard-properties/propertyies-list/propertyies-list';
import { Filtering } from './components/dashboard-properties/filtering/filtering';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

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
    Filtering
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    DashboardRoutingModule,
    FormsModule,
    ConfirmDialog,
    Select,
    InputTextModule,
    FloatLabel,
    InputIcon,
    IconField,
    DrawerModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule
  ]
})
export class DashboardModule { }
