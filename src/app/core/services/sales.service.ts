import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SalesStatistics } from '../models/Interfaces/ISales-statistics.inteface';
import { HttpClient } from '@angular/common/http';
import { PaginationResponse } from '../models/Interfaces/IpaginationResponse.interface';
import { ISale } from '../models/Interfaces/ISale.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpClient: HttpClient) { }
  addNewSale(saleData: FormData): Observable<any> {
    return this._httpClient.post<any>(`${this.baseUrl}/api/Sales`, saleData);
  }
  getSales(pageNumber: number, pageSize: number): Observable<PaginationResponse<ISale>> {
    return this._httpClient.get<any>(`${this.baseUrl}/api/Sales?PageSize=${pageSize}&PageNumber=${pageNumber}`);
  }

  getSalesStatistics(): Observable<SalesStatistics> {
    return this._httpClient.get<any>(`${this.baseUrl}/api/Sales/statistics`);
  }
  getSaleById(saleId: string): Observable<ISale> {
    return this._httpClient.get<any>(`${this.baseUrl}/api/Sales/Id/${saleId}`);
  }

}
