import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { IProperty } from '../models/Interfaces/Iproperty.interface';
import { PaginationResponse } from '../models/Interfaces/IpaginationResponse.interface';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpclient: HttpClient) { }



  addNewProperty(propertyData: FormData): Observable<any> {
    return this._httpclient.post<any>(`${this.baseUrl}/api/Properties`, propertyData);
  }

  getPropertiesPage(pageNumber: number, pageSize: number): Observable<PaginationResponse<IProperty>> {
    return this._httpclient.get<PaginationResponse<IProperty>>(`${this.baseUrl}/api/Properties?PageSize=${pageSize}&PageNumber=${pageNumber}`);
  }


  getPropertiesByCategory(categoryId: string, pageNumber: number, pageSize: number): Observable<PaginationResponse<IProperty>> {
    return this._httpclient.get<PaginationResponse<IProperty>>(`${this.baseUrl}/api/Properties/Category/${categoryId}?PageSize=${pageSize}&PageNumber=${pageNumber}`);
  }
  getFeaturedProperties(): Observable<IProperty[]> {
    return this._httpclient.get<IProperty[]>(`${this.baseUrl}/api/Properties/featured`);
  }
  getlatestProperties(): Observable<IProperty[]> {
    return this._httpclient.get<IProperty[]>(`${this.baseUrl}/api/Properties/latest`);
  }

  getPropertyById(propertyId: string): Observable<IProperty> {
    return this._httpclient.get<IProperty>(`${this.baseUrl}/api/Properties/Id/${propertyId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        })
      );
  }

  deleteProperty(propertyId: string): Observable<HttpResponse<any>> {
    return this._httpclient.delete<any>(`${this.baseUrl}/api/Properties/Delete/Id/${propertyId}`, {
      observe: 'response'
    });
  }
}
