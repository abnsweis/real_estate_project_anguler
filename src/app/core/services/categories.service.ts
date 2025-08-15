import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../models/Interfaces/IpaginationResponse.interface';
import { ICategory } from '../models/Interfaces/Icategory.inteface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpClient: HttpClient) { }

  getCategories(): Observable<PaginationResponse<ICategory>> {
    return this._httpClient.get<PaginationResponse<ICategory>>(`${this.baseUrl}/api/Categories`);
  }
  addNewCategory(categoryName: string): Observable<any> {
    return this._httpClient.post<any>(`${this.baseUrl}/api/Categories`, {
      categoryName: categoryName
    });
  }

  updateCategory(categoryId: string, categoryName: string): Observable<HttpResponse<any>> {
    return this._httpClient.put<any>(`${this.baseUrl}/api/Categories/${categoryId}`, {
      categoryName: categoryName
    });
  }

  deleteCategory(categoryId: string) {
    return this._httpClient.delete(`${this.baseUrl}/api/Categories/${categoryId}`);
  }
}
