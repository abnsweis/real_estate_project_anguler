import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../models/paginationResponse.interface';
import { ICategory } from '../models/category.inteface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpClient: HttpClient) { }

  getCategories(page: number, pageSize: number): Observable<PaginationResponse<ICategory>> {
    return this._httpClient.get<PaginationResponse<ICategory>>(`${this.baseUrl}/api/Categories?PageSize=11&PageNumber=1`);
  }
}
