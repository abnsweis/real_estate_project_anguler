import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { IProperty } from '../models/property.interface';
import { PaginationResponse } from '../models/paginationResponse.interface';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpclient: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }


  getPropertiesPage(pageNumber: number, pageSize: number): Observable<PaginationResponse<IProperty>> {
    return this._httpclient.get<PaginationResponse<IProperty>>(`${this.baseUrl}/api/Properties?PageSize=${pageSize}&PageNumber=${pageNumber}`);
  }


  getPropertiesByCategory(categoryId: string, pageNumber: number, pageSize: number): Observable<PaginationResponse<IProperty>> {
    return this._httpclient.get<PaginationResponse<IProperty>>(`${this.baseUrl}/api/Properties/Category/${categoryId}?PageSize=${pageSize}&PageNumber=${pageNumber}`);
  }

  getPropertyById(propertyId: string): Observable<IProperty> {
    return this._httpclient.get<IProperty>(`${this.baseUrl}/api/Properties/Id/${propertyId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('Error Type:', err.error.type);
          console.log('Title:', err.error.title);
          console.log('Status:', err.status); // أو err.error.status
          console.log('Detail:', err.error.detail);
          console.log('Instance:', err.error.instance);
          console.log('TraceId:', err.error.traceId);
          console.log('ErrorCode:', err.error.errorCode);
          return throwError(() => err);
        })
      );
  }
}
