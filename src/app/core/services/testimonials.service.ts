import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ITestimonial } from '../models/Interfaces/ITestimonial.inteface';
import { PaginationResponse } from '../models/Interfaces/IpaginationResponse.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _httpclient: HttpClient) { }


  getTop4Testimonials(): Observable<PaginationResponse<ITestimonial>> {
    return this._httpclient.get<PaginationResponse<ITestimonial>>(`${this.baseUrl}/api/Testimonials?PageSize=4&PageNumber=1`)
  }

}
