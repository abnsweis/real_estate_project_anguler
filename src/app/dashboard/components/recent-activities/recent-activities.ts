import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../../../core/services/propertys.service';
import { IProperty } from '../../../core/models/Interfaces/Iproperty.interface';
import { ICustomer } from '../../../core/models/Interfaces/Icustomer.interface';
import { CustomersService } from '../../../core/services/customers.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recent-activities',
  standalone: false,
  templateUrl: './recent-activities.html',
  styleUrl: './recent-activities.css'
})
export class RecentActivities implements OnInit {
  latestPropertiesList: IProperty[] = [];
  latestCustomersList: ICustomer[] = [];


  constructor(private propertiesService: PropertiesService,
    private customersService: CustomersService
    , private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.loadRecentActivities();
  }

  private loadRecentActivities(): void {
    forkJoin({
      properties: this.propertiesService.getFeaturedProperties(),
      customers: this.customersService.getLatestCustomers()
    }).subscribe({
      next: (res) => {
        this.latestPropertiesList = res.properties.slice(0, 5);
        this.latestCustomersList = res.customers;
      },
      error: (err) => {
        this.toastr.error('فشل تحميل الأنشطة الأخيرة:', err);
      }
    });
  }
}
