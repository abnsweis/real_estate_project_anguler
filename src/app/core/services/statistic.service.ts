import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IStatisticDTO } from '../models/Interfaces/Istatistic.interface';
import { IMonthlyFinancialSummaryDTO } from '../models/Interfaces/monthlyFinancialSummaryDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpClient: HttpClient) { }

  getStatistics(): Observable<IStatisticDTO[]> {
    return this._httpClient.get<IStatisticDTO[]>(`${this.baseUrl}/api/Statistics`);
  }
  getTotalSalesRevenue(): Observable<any> {
    return this._httpClient.get<any>(`${this.baseUrl}/api/Statistics/total-sales-revenue`);
  }
  getTotalRentalsRevenue(): Observable<any> {
    return this._httpClient.get<any>(`${this.baseUrl}/api/Statistics/total-rentals-revenue`);
  }
  getMonthlySales(year: number | null = null): Observable<IMonthlyFinancialSummaryDTO[]> {
    if (year == null) {
      year = new Date().getFullYear()
    }
    return this._httpClient.get<IMonthlyFinancialSummaryDTO[]>(`${this.baseUrl}/api/Statistics/monthly-sales?year=${year}`);
  }
  getMonthlyRentals(year: number | null = null): Observable<IMonthlyFinancialSummaryDTO[]> {
    if (year == null) {
      year = new Date().getFullYear()
    }
    return this._httpClient.get<IMonthlyFinancialSummaryDTO[]>(`${this.baseUrl}/api/Statistics/monthly-rentals?year=${year}`);
  }
}
