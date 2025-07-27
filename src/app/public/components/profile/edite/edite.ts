import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IUser } from '../../../../core/models/Interfaces/IUser.interfsce';
import { AuthService } from '../../../../core/services/auth.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { emailExistsValidator } from '../../../../shared/validators/email-exists-validator';
import { usernameExistsValidator } from '../../../../shared/validators/username-exists-validator';
import { phoneNumberExistsValidator } from '../../../../shared/validators/phoneNumber-exists-validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edite',
  standalone: false,
  templateUrl: './edite.html',
  styleUrl: './edite.css'
})
export class Edite implements OnInit {

  @Input() my!: IUser;
  editeUserForm!: FormGroup;
  imagePreviewUrl: string | undefined = "";
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {


  }
  ngOnInit(): void {
    this.getCurrentUserData();
  }

  getCurrentUserData() {
    this.authService.getMy().subscribe({
      next: (value) => {
        this.my = value;
        this.createFormAndLoadUserData();


      },
      error: (err) => { }
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imagePreviewUrl = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('dateOfBirth', this.editeUserForm.get('dateOfBirth')?.value);
    formData.append('email', this.editeUserForm.get('email')?.value);
    formData.append('fullName', this.editeUserForm.get('fullName')?.value);
    formData.append('gender', this.editeUserForm.get('gender')?.value);
    formData.append('phoneNumber', this.editeUserForm.get('phoneNumber')?.value);
    formData.append('username', this.editeUserForm.get('username')?.value);

    if (this.selectedFile) {
      formData.append('ImageURL', this.selectedFile); // <-- اسم الحقل لازم يطابق اسم الـ DTO
    }


    this.authService.updateMyProfile(formData).subscribe({
      next: (value) => {
        this.router.navigateByUrl('my');
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }


  createFormAndLoadUserData() {
    this.editeUserForm = this.fb.group({
      fullName: [this.my.fullName, [Validators.required]],
      username: [this.my.username, [Validators.required], [usernameExistsValidator(this.my.username ?? '', this.authService)]],
      email: [this.my.email, [Validators.required, Validators.email], [emailExistsValidator(this.my.email ?? '', this.authService)]],
      phoneNumber: [this.my.phoneNumber, [Validators.required], [phoneNumberExistsValidator(this.my.phoneNumber ?? '', this.authService)]],

      gender: [this.my.gender == 'Male' ? 0 : 1, [Validators.required]],
      imageURL: [this.my.imageUrl, [Validators.required]],
      dateOfBirth: [this.my.dateOfBirth, [Validators.required, this.minimumAgeValidator(18)]]
    });

    this.imagePreviewUrl = this.my.imageUrl;
  }

  minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDateValue = control.value;

      if (!birthDateValue) {
        return { required: true };
      }

      const birthDate = new Date(birthDateValue);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= minAge ? null : { underage: { requiredAge: minAge, actualAge: age } };
    };
  }





}
