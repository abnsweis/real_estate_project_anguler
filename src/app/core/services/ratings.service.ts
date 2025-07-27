import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../models/Interfaces/IpaginationResponse.interface';
import { IRating } from '../models/Interfaces/Irating.inteface';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpclient: HttpClient) { }



  getPropertyRatings(propertyId: string): Observable<PaginationResponse<IRating>> {
    return this._httpclient.get<PaginationResponse<IRating>>(`${this.baseUrl}/api/Ratings?propertyId=${propertyId}`);
  }
  addRating(propertyId: string, ratingText: string, ratingNumber: number): Observable<any> {

    return this._httpclient.post(`${this.baseUrl}/api/Ratings/property-Id/${propertyId}`, {
      ratingText: ratingText,
      ratingNumber: ratingNumber
    });

  }
}
