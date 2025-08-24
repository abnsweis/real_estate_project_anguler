import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICustomer } from '../models/Interfaces/Icustomer.interface';
import { PaginationResponse } from '../models/Interfaces/IpaginationResponse.interface';
import { IProperty } from '../models/Interfaces/Iproperty.interface';
import { ICustomerTransaction } from '../models/Interfaces/Icustomer.transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpClient: HttpClient) { }
  addNewCustomer(CustomerData: FormData): Observable<any> {
    return this._httpClient.post<any>(`${this.baseUrl}/api/Customers`, CustomerData);
  }

  updateCustomer(customerId: string, customerData: FormData): Observable<HttpResponse<any>> {
    return this._httpClient.put<any>(`${this.baseUrl}/api/Customers/${customerId}`, customerData);
  }

  getLatestCustomers(): Observable<ICustomer[]> {
    return this._httpClient.get<ICustomer[]>(`${this.baseUrl}/api/Customers/latest?count=5`);
  }
  getCustomersPage(pageNumber: number, pageSize: number): Observable<PaginationResponse<ICustomer>> {
    return this._httpClient.get<PaginationResponse<ICustomer>>(`${this.baseUrl}/api/Customers?PageSize=${pageSize}&PageNumber=${pageNumber}`);
  }

  checkCustomerExistsByNationalId(nationalId: string): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.baseUrl}/api/Customers/Exists/NationalId/${nationalId}`).pipe(
      catchError(() => of(false))
    );
  }

  getCustomerByNationalId(nationalId: string): Observable<ICustomer> {
    return this._httpClient.get<ICustomer>(`${this.baseUrl}/api/Customers/NationalId/${nationalId}`)
  }
  getCustomerByCustomerId(customerId: string): Observable<ICustomer> {
    return this._httpClient.get<ICustomer>(`${this.baseUrl}/api/Customers/${customerId}`);
  }

  deleteCustomer(customerId: string): Observable<HttpResponse<any>> {
    return this._httpClient.delete<any>(`${this.baseUrl}/api/Customers/${customerId}`, {
      observe: 'response'
    });
  }

  getCustomerTransactions(customerId: string): Observable<ICustomerTransaction[]> {
    return this._httpClient.get<any>(`${this.baseUrl}/api/Customers/transactions/${customerId}`);
  }

}
