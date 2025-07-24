import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IFavorite } from '../models/Interfaces/Ifavorite.inteface';
import { HttpClient } from '@angular/common/http';
import { PaginationResponse } from '../models/Interfaces/IpaginationResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  baseUrl: string = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {

  }

  getUserFavorites(): Observable<PaginationResponse<IFavorite>> {
    return this.httpClient.get<PaginationResponse<IFavorite>>(`${this.baseUrl}/api/Favorites`);
  }

  AddTofavorite(propertyId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/api/Favorites/${propertyId}`, null)
  }
  removeFromFavorite(propertyId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/api/Favorites/${propertyId}`)
  }

  IsInFavorite(propertyId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/api/Favorites/is-n-favorite/${propertyId}`)
  }
}
