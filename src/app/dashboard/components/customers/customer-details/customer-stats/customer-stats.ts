import { Component, Input } from '@angular/core';
import { ICustomer } from '../../../../../core/models/Interfaces/Icustomer.interface';

@Component({
  selector: 'app-customer-stats',
  standalone: false,
  templateUrl: './customer-stats.html',
  styleUrl: './customer-stats.css'
})
export class CustomerStats {

  @Input() customer!: ICustomer;

}
