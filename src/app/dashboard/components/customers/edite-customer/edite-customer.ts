import { Component } from '@angular/core';
import { enMode } from '../../../../shared/enums/en-mode';
import { ICustomer } from '../../../../core/models/Interfaces/Icustomer.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../../../core/services/customers.service';

@Component({
  selector: 'app-edite-customer',
  standalone: false,
  templateUrl: './edite-customer.html',
  styleUrl: './edite-customer.css'
})
export class EditeCustomer {
  enMode = enMode


  customerId: string | undefined = '';
  customer: ICustomer | null = null;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private customersService: CustomersService) {

  }
  ngOnInit(): void {
    // Get the propertyId from the query parameters
    this.getCustomerIdFromActivatedRoute();

  }







  getCustomerIdFromActivatedRoute() {
    // Get the query parameters from the current route
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.customerId = params.get('customerId') ?? undefined;
        this.getPropertyById();
      },
    })
  }


  getPropertyById() {
    if (this.customerId) {
      this.customersService.getCustomerByCustomerId(this.customerId).subscribe({
        next: (customer) => {
          this.customer = customer;

          console.log(customer)
        },
        error: (err) => {
          console.error('Error fetching customer:', err);
        }
      });
    } else {
      console.warn('No customerId provided to fetch customer details.');
    }
  }
}
