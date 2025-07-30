import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  isLoggedIn: boolean = false;

  constructor(public _authService: AuthService, private router: Router) {
    this.isLoggedIn = _authService.isLoggedIn();
  }


  Logout(): void {
    this._authService.logout().subscribe();
    this.router.navigateByUrl('auth/login');
  }
}
