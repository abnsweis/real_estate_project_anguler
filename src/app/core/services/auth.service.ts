import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, from, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../public/auth/login/login';
import { LoginInfo } from '../../public/auth/login/LoginInfo';
import { IUser } from '../models/Interfaces/IUser.interfsce';
import { Auth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from '@angular/fire/auth';
import { th } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private auth: Auth) {

  }

  baseUrl: string = environment.apiBaseUrl;

  login(loginInfo: LoginInfo): Observable<string> {

    return this.httpClient.post<string>(`${this.baseUrl}/api/Account/login`, loginInfo);
  }
  logout(): Observable<void> {
    localStorage.removeItem('token');
    return from(signOut(this.auth)).pipe(
      switchMap(() => this.httpClient.post<void>(`${this.baseUrl}/api/Account/logout`, null))
    );
  }

  register(formData: FormData): Observable<any> {

    return this.httpClient.post<any>(`${this.baseUrl}/api/Account/register`, formData);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  loginWithGoogle(): void {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(this.auth, provider);
  }

  // بعد العودة من Google
  checkRedirectResult() {
    getRedirectResult(this.auth)
      .then((result) => {
        if (result) {
          console.log('User:', result.user);
          alert('Login successful');
        }
      })
      .catch((error) => {
        console.error('Redirect login error:', error);
        alert('Login failed');
      });
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getMy(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseUrl}/api/Account/my`);
  }
  updateMyProfile(data: any): Observable<any> {
    console.log(data + "'''''''''''''''''")
    return this.httpClient.put<any>(`${this.baseUrl}/api/Account/my/edite`, data);
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/api/Users/exists-email?email=${email}`).pipe(
      catchError(() => of(false))
    );
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/api/Users/exists-username?username=${username}`).pipe(
      catchError(() => of(false))
    );
  }
  checkPhoneNumberExists(phoneNumber: string): Observable<boolean> {
    var encodedPhoneNumber = encodeURIComponent(phoneNumber);
    return this.httpClient.get<boolean>(`${this.baseUrl}/api/Users/exists-phoneNumber?PhoneNumber=${encodedPhoneNumber}`).pipe(
      tap(value => console.log(value))
      , catchError((err) => {

        return of(false);
      })
    );
  }


}