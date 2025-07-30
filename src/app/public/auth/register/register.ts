import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { usernameExistsValidator } from '../../../shared/validators/username-exists-validator';
import { AuthService } from '../../../core/services/auth.service';
import { emailExistsValidator } from '../../../shared/validators/email-exists-validator';
import { phoneNumberExistsValidator } from '../../../shared/validators/phoneNumber-exists-validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginInfo } from '../login/LoginInfo';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: false,
})
export class Register {
  imagePreviewUrl: string | undefined = "";
  selectedFile: File | null = null;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.registerForm.valueChanges.subscribe(v => console.log(v));
  }

  createForm() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required], [usernameExistsValidator('', this.authService)]],
      email: ['', [Validators.required, Validators.email], [emailExistsValidator('', this.authService)]],
      phoneNumber: ['', [Validators.required], [phoneNumberExistsValidator('', this.authService)]],
      gender: [0, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      imageURL: [this.selectedFile],
      dateOfBirth: ['', [Validators.required, this.minimumAgeValidator(18)]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: true };
      }

      const birthDate = new Date(control.value);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= minAge ? null : { underage: { requiredAge: minAge, actualAge: age } };
    };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error('الرجاء تعبئة جميع الحقول المطلوبة بشكل صحيح', 'خطأ في النموذج');
      return;
    }

    const formData = new FormData();
    Object.keys(this.registerForm.controls).forEach(key => {
      if (key !== 'imageURL') {
        formData.append(key, this.registerForm.get(key)?.value);
      }
    });

    if (this.selectedFile) {
      formData.append('imageURL', this.selectedFile);
    }

    this.authService.register(formData).subscribe({
      next: (res) => {
        this.toastr.success('تم التسجيل بنجاح!', 'نجاح');
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'حدث خطأ أثناء التسجيل';
        this.toastr.error(errorMessage, 'فشل التسجيل');

        if (err.error?.errors) {
          Object.keys(err.error.errors).forEach(key => {
            const control = this.registerForm.get(key);
            if (control) {
              control.setErrors({ serverError: err.error.errors[key][0] });
            }
          });
        }
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imagePreviewUrl = URL.createObjectURL(file);
      this.registerForm.patchValue({ imageURL: file });
      this.registerForm.get('imageURL')?.updateValueAndValidity();
    }
  }
}