import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICustomer } from '../models/Interfaces/Icustomer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpClient: HttpClient) { }

  getLatestCustomers(): Observable<ICustomer[]> {
    return this._httpClient.get<ICustomer[]>(`${this.baseUrl}/api/Customers/latest?count=5`);
  }
}
