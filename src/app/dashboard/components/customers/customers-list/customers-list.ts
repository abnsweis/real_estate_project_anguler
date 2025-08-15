import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from '../../../../core/models/classes/auth/tableColumn';
import { CustomersTable } from './table/table';

@Component({
  selector: 'app-customers-list',
  standalone: false,
  templateUrl: './customers-list.html',
  styleUrl: './customers-list.css'
})
export class CustomersList implements OnInit {
  ngOnInit(): void {
  }


  CUSTOMER_HEADERS: TableColumn[] = [
    { field: 'fullName', header: 'الاسم الكامل' },
    { field: 'nationalId', header: 'الرقم الوطني' },
    { field: 'phoneNumber', header: 'رقم الهاتف' },
    { field: 'dateOfBirth', header: 'تاريخ الميلاد' },
    { field: 'gender', header: 'الجنس' },
    { field: 'customerType', header: 'نوع العميل' }
  ];
  @ViewChild('Table') table!: CustomersTable;
  successfullyAddedCustomer: boolean = false;
  successfullyUpdateCustomer: boolean = false;
  successfullyDeleteCustomer: boolean = false;
  Count = 0;





  onDeleteCustome() {
    this.successfullyDeleteCustomer = true;
  }


  updateCount(count: any) {
    this.Count = count;
  }
}
