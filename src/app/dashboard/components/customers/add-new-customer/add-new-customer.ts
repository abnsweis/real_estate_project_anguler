import { Component } from '@angular/core';
import { enMode } from '../../../../shared/enums/en-mode';

@Component({
  selector: 'app-add-new-customer',
  standalone: false,
  templateUrl: './add-new-customer.html',
  styleUrl: './add-new-customer.css'
})
export class AddNewCustomer {
  enMode = enMode
}
