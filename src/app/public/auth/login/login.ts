import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoginInfo } from './LoginInfo';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './logincopy.html',
  styleUrl: './login.css',
})
export class Login {
  loginInfo: LoginInfo = new LoginInfo();
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  Login(form: NgForm) {
    this.clearErrorMessage(); // Clear any previous general error message

    if (form?.invalid) {
      return;
    }

    this.loginInfo = form.value;
    this.authService.login(this.loginInfo).subscribe({
      next: (res: any) => {
        // Redirect or handle successful login
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (error) => {

        console.log(error)

        const responseBody = error.error;
        if (responseBody && responseBody.errors && responseBody.errors.length > 0) {
          this.errorMessage = this.errorMessage = responseBody.errors
            .map((err: any) => err.messages.map((m: any) => m.text).join(', '))
            .join(' | ');
        } else {
          this.errorMessage = 'حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.';
        }
      },
    });
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  loginWithGoogle() {
    this.authService.checkRedirectResult();
  }
}