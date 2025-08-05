import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
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

  checkCustomerExistsByNationalId(nationalId: string): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.baseUrl}/api/Customers/Exists/NationalId/${nationalId}`).pipe(
      catchError(() => of(false))
    );
  }

  getCustomerByNationalId(nationalId: string): Observable<ICustomer | null> {
    return this._httpClient.get<ICustomer>(`${this.baseUrl}/api/Customers/NationalId/${nationalId}`).pipe(
      catchError(() => of(null))
    );
  }
}
