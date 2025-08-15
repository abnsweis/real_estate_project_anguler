import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { ICustomer } from '../../../../../core/models/Interfaces/Icustomer.interface';
import { TableColumn } from '../../../../../core/models/classes/auth/tableColumn';
import { CustomersService } from '../../../../../core/services/customers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { DataService } from '../../../../../core/services/data.service';
import { Utilities } from '../../../../../shared/utilities/utilities';

@Component({
  selector: 'app-customers-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class CustomersTable implements OnInit {

  filteredCustomers: ICustomer[] = [];
  loading = false;
  @Input() customers: ICustomer[] = [];
  @Output() onDeletedCustomer = new EventEmitter<string>();
  @Output() onUpdatedCustomer = new EventEmitter<number>();
  @Output() onAddedCustomer = new EventEmitter<number>();
  @Output() countChanged = new EventEmitter<number>();
  @Output() onFilter = new EventEmitter<number>();
  @Input() totalRecords = 0;
  @Input() pageSize = 20;
  @Input() CUSTOMER_HEADERS: TableColumn[] = [];
  genderOptions = [
    { label: 'ذكر', value: 'Male' },
    { label: 'أنثى', value: 'Female' },
  ];



  constructor(private customersService: CustomersService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private dataservice: DataService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService) { }
  ngOnInit(): void {

    this.dataservice.search$.subscribe({
      next: (searchValue) => {
        this.filter(searchValue);
        this.dataservice.setCount(this.filteredCustomers.length)
      }
    });
  }

  filter(searchValue: string) {
    this.filteredCustomers = this.customers.filter(p => {
      return p.fullName.includes(searchValue) || p.nationalId.includes(searchValue)
    });
  }
  confirmDelete(event: Event, customerId: string) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'هل تريد حذف هذا العميل؟',
      header: 'تأكيد الحذف',
      icon: 'pi pi-info-circle',
      acceptLabel: 'حذف',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'حذف',
        severity: 'danger',
      },

      accept: () => {
        this.customersService.deleteCustomer(customerId).subscribe({
          next: () => {
            this.onDeletedCustomer.emit('تم  حذف العميل بنجاح ✅');
            this.loadCustomers({ first: 0, rows: this.pageSize })
          },
        })
      },
      reject: () => {
      },
    });
  }

  handelCustomerTypeName(customerType: any): string {
    return Utilities.getCustomerTypeArabicLabel(Number(customerType));
  }
  loadCustomers(event: any) {
    const lazyEvent = event as LazyLoadEvent;

    const pageNumber = ((lazyEvent.first ?? 0) / (lazyEvent.rows ?? 5)) + 1;
    const pageSize = lazyEvent.rows ?? 5;

    // API Call
    this.customersService.getCustomersPage(pageNumber, pageSize).subscribe({
      next: (res) => {
        this.customers = res.items;
        this.totalRecords = res.totalCount;
        this.filteredCustomers = this.customers;

        this.loading = false;
        this.dataservice.setCount(this.customers.length)

      },
      error: (err) => {
        this.loading = false;
      },
    });
  }




  getGenderAr(gender: string): string {
    return gender === 'Male' ? 'ذكر' : 'أنثى';
  }



}
