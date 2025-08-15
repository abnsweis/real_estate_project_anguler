import { Component } from '@angular/core';
import { ICustomer } from '../../../../core/models/Interfaces/Icustomer.interface';
import { CustomersService } from '../../../../core/services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { format } from 'date-fns';
import { ar, th } from 'date-fns/locale'
import { IProperty } from '../../../../core/models/Interfaces/Iproperty.interface';
import { PropertiesService } from '../../../../core/services/propertys.service';
import { ICustomerTransaction } from '../../../../core/models/Interfaces/Icustomer.transaction.interface';
@Component({
  selector: 'app-customer-details',
  standalone: false,
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetails {


  customerId: string = '';
  formatedDateOfBirth: string = '';
  formatedJoiningDate: string = '';

  properties: IProperty[] = [];
  transactions: ICustomerTransaction[] = [];
  private subscriptions: Subscription[] = [];

  customer: ICustomer | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customersService: CustomersService,
    private propertiesService: PropertiesService
  ) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.customerId = params.get('customerId') ?? '';
      this.loadCustomerDetails();
    });
  }



  loadCustomerDetails() {
    this.customersService.getCustomerByCustomerId(this.customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.formatedDateOfBirth = format(this.customer?.dateOfBirth ?? '', 'yyyy-MM-dd');
        this.formatedJoiningDate = format(this.customer?.joiningDate ?? '', 'd MMM yyyy', { locale: ar });
      },
      error: (error) => {
        this.router.navigate(['/dashboard', 'manage-properties'], {
          queryParams: { propertyNotFound: `لم يتم العثور على هاذا العميل ${this.customerId}` }
        });
      }
    });
  }
  OnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
