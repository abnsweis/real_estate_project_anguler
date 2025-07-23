import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../public/auth/login/login';
import { LoginInfo } from '../../public/auth/login/LoginInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {

  }

  baseUrl: string = environment.apiBaseUrl;

  login(loginInfo: LoginInfo): Observable<string> {

    return this.httpClient.post<string>(`${this.baseUrl}/api/Account/login`, loginInfo);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  Logout(): void {
    localStorage.removeItem('token');
  }
  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
}
