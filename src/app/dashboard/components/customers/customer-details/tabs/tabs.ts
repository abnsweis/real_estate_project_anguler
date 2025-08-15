import { Component, Input, OnInit } from '@angular/core';
import { ICustomer } from '../../../../../core/models/Interfaces/Icustomer.interface';
import { Subscription } from 'rxjs';
import { ICustomerTransaction } from '../../../../../core/models/Interfaces/Icustomer.transaction.interface';
import { IProperty } from '../../../../../core/models/Interfaces/Iproperty.interface';
import { CustomersService } from '../../../../../core/services/customers.service';
import { PropertiesService } from '../../../../../core/services/propertys.service';

@Component({
  selector: 'app-tabs',
  standalone: false,
  templateUrl: './tabs.html',
  styleUrl: './tabs.css'
})
export class Tabs implements OnInit {
  @Input() customer!: ICustomer | null;
  @Input() customerId: string = '';

  properties: IProperty[] = [];
  transactions: ICustomerTransaction[] = [];
  @Input() formatedDateOfBirth: string = '';
  @Input() formatedJoiningDate: string = '';
  constructor(
    private customersService: CustomersService,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit() {
  }

  onTabChange(activeTabIndex: any) {
    if (activeTabIndex === '1') {
      this.loadProperties();
    } else if (activeTabIndex === '2') {
      this.loadTransactions();
    }
  }


  loadProperties() {
    this.propertiesService.getPropertiesByOwnerId(this.customerId).subscribe({
      next: (response) => {
        this.properties = response.items;
      },
    });
  }

  loadTransactions() {
    this.customersService.getCustomerTransactions(this.customerId).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
    });
  }
}

