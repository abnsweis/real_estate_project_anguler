import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../../../core/services/propertys.service';
import { IProperty } from '../../../core/models/Interfaces/Iproperty.interface';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {
  isShowedSidebar: boolean = false;



  showSidebarToggle() {
    this.isShowedSidebar = !this.isShowedSidebar;
  }
}
