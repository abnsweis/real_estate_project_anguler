import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  previewUrl: string | ArrayBuffer | null = null;
  dateOfBirth: Date = new Date();


  ngOnInit(): void {
    this.previewUrl = '../../../../assets/img/img--user.png';
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.previewUrl = reader.result
    }

    reader.readAsDataURL(file);
  }
}
