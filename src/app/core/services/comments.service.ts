import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PaginationResponse } from '../models/Interfaces/IpaginationResponse.interface';
import { IComment } from '../models/Interfaces/Icomment.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl: string = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {

  }

  getProprtyComments(propertyId: string) {
    return this.httpClient.get<PaginationResponse<IComment>>(`${this.baseUrl}/api/Comments/property/Id/${propertyId}`);
  }

  addNewComment(propertyId: string, commentText: string): Observable<any> {
    console.log(`
        propertyId : ${propertyId}
        commentText : ${commentText}
      
      `);
    return this.httpClient.post(`${this.baseUrl}/api/Comments`, {
      propertyId: propertyId,
      text: commentText
    });

  }
}
