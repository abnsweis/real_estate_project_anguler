import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from '../../../core/models/classes/auth/tableColumn';
import { CustomersList } from './customers-list/customers-list';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {

  performSearchEvent: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('CustomerslistComponent') CustomerslistComponent!: CustomersList;
  updateCount(count: any) {
    this.customersCount = count;
  }
  CUSTOMER_HEADERS: TableColumn[] = [
    { field: 'fullName', header: 'الاسم الكامل' },
    { field: 'nationalId', header: 'الرقم الوطني' },
    { field: 'phoneNumber', header: 'رقم الهاتف' },
    { field: 'dateOfBirth', header: 'تاريخ الميلاد' },
    { field: 'gender', header: 'الجنس' },
    { field: 'customerType', header: 'نوع العميل' }
  ];

  filterEventData = { filter: '', value: '' };
  customersCount: number = 0;

  onFilterEvent(event: { filter: string; value: string }) {
    // this.CustomerslistComponent.table.filter(event);
    this.customersCount = this.CustomerslistComponent.table.filteredCustomers.length;
  }

   
}
