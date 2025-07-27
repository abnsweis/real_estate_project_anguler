import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../core/models/Interfaces/IUser.interfsce';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  my: IUser | null = null;
  visible: boolean = false;
  date: Date | undefined;
  showDialog() {
    this.visible = true;
  }
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.getMy().subscribe({
      next: (value) => {

        this.my = value;
      },

      error: (err) => {
        console.log(err);
      },
    })
  }
}
