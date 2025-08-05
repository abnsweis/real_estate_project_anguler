import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICustomer } from '../../../../../core/models/Interfaces/Icustomer.interface';
import { CustomersService } from '../../../../../core/services/customers.service';

@Component({
  selector: 'app-top-section',
  standalone: false,
  templateUrl: './top-section.html',
  styleUrl: './top-section.css'
})
export class TopSection implements OnChanges, OnInit {

  @Input() ownerNationalId: string | undefined;

  ownerInfo: ICustomer | null = null;
  propertiesCount: number = 0;

  // This is the constructor for the TopSection component
  constructor(private customersService: CustomersService) {
    this.reset();

  }
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCustomerByNationalId(this.ownerNationalId ?? '');
    if (changes['ownerNationalId']) {

      // changes['ownerNationalId'] => info about the new value passed from the parent component

      const change = changes['ownerNationalId'];

      // If the value has changed and is not the first change
      // This prevents the initial load from triggering the method
      if (!change.firstChange) {
        this.loadCustomerByNationalId(change.currentValue);
      }
    }
  }
  // This method is called when the ownerNationalId changes
  // It fetches the customer information based on the national ID
  loadCustomerByNationalId(nationalId: string): void {
    this.loadOwnerInfo();
  }


  // This method resets the customer information to default values
  reset() {
    if (this.ownerInfo) {
      this.ownerInfo.fullName = 'غير محدد';
      this.ownerInfo.phoneNumber = 'غير محدد';
      // this.propertiesCount = 0;
    }
  }


  // This method loads the customer information based on the national ID
  loadOwnerInfo() {
    if (this.ownerNationalId) {
      // Call the service to get customer information
      this.customersService.getCustomerByNationalId(this.ownerNationalId).subscribe({

        // If the customer is found, update the ownerInfo and other properties
        next: (customer: ICustomer | null) => {
          this.ownerInfo = customer;
        },
        // If the customer is not found, reset the information
        error: (err) => {
          console.error('Error loading customer:', err);
          this.reset();
        }
      });
    }
    else {// If no national ID is provided, reset the information
      this.reset();
    }
  }
}
