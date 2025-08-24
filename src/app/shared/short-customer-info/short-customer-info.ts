import { Component, Input } from '@angular/core';
import { ICustomer } from '../../core/models/Interfaces/Icustomer.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-short-customer-info',
  imports: [RouterModule],
  templateUrl: './short-customer-info.html',
  styleUrl: './short-customer-info.css'
})
export class ShortCustomerInfo {

  @Input() customer!: ICustomer | null;
  @Input() class: string = '';
  @Input() title: string = '';
}
