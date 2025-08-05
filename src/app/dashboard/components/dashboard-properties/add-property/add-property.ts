import { Component, OnInit } from '@angular/core';
import { UploadEvent } from 'primeng/fileupload';
import { ICategory } from '../../../../core/models/Interfaces/Icategory.inteface';
import { CategoriesService } from '../../../../core/services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertiesService } from '../../../../core/services/propertys.service';
import { customerExistsByNationalIdValidator } from '../../../../shared/validators/customer-exists-by-nationalId-validator copy';
import { CustomersService } from '../../../../core/services/customers.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  standalone: false,
  templateUrl: './add-property.html',
  styleUrl: './add-property.css'
})
export class AddProperty implements OnInit {

  categories: any[] = [];
  selectedCategory: number | undefined;

  validNationalId: boolean = false;

  addPropertyForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private customersService: CustomersService,
    private route: Router,
    private propertyService: PropertiesService) {

  }
  ngOnInit(): void {
    this.loadCategoryies();
    this.createForm();
  }
  createForm() {
    this.addPropertyForm = this.fb.group({
      title: ['', Validators.required],
      ownerNationalId: ['', [Validators.required], [customerExistsByNationalIdValidator('', this.customersService)]],
      categoryId: [`${this.selectedCategory}`, Validators.required],
      price: [null, Validators.required],
      area: [null, Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      images: [[null], Validators.required],
      video: [[null]],
    })
  }






  onImagesSelected(event: any) {
    const files: FileList = event.originalEvent.target.files;
    const filesArray: File[] = Array.from(files);

    this.addPropertyForm.patchValue({ images: filesArray });
    this.addPropertyForm.get('images')?.markAsTouched();
    this.addPropertyForm.get('images')?.updateValueAndValidity();

    console.log(filesArray);
  }
  onVideoSelected(event: any) {
    const files: File[] = event.files;  // <-- هون PrimeNG بيرجع Array مباشرة

    if (files && files.length > 0) {
      const file = files[0];  // بما أنو الفيديو واحد فقط
      this.addPropertyForm.patchValue({ video: file });
      this.addPropertyForm.get('video')?.markAsTouched();
      this.addPropertyForm.updateValueAndValidity();
    }
  }



  loadCategoryies() {
    this.categoriesService.getCategories(1, Number.MAX_VALUE).subscribe({
      next: (res) => {
        this.categories = res.items.map((category: ICategory) => ({
          label: category.categoryName,
          value: category.categoryId
        }));

        this.selectedCategory = this.categories[0]?.value;

        if (this.addPropertyForm) {
          this.addPropertyForm.patchValue({ categoryId: this.selectedCategory });
        }
      },
    });
  }
  validateImages(): boolean {
    const imagesControl = this.addPropertyForm.get('images');

    if (!imagesControl?.value || imagesControl.value.length === 0) {
      imagesControl?.setErrors({ required: true });
      return false;
    }
    imagesControl.setErrors(null);  // clear errors if valid
    return true;
  }

  buildFormData(): FormData {
    const formData = new FormData();
    const formValue = this.addPropertyForm.value;
    console.log(formValue.images)

    formData.append('title', formValue.title);
    formData.append('ownerNationalId', formValue.ownerNationalId);
    formData.append('categoryId', formValue.categoryId);
    formData.append('price', formValue.price);
    formData.append('area', formValue.area);
    formData.append('location', formValue.location);
    formData.append('address', formValue.address);
    formData.append('propertyStatus', formValue.propertyStatus);
    formData.append('description', formValue.description);

    const images: File[] = formValue.images || [];
    images.forEach((file: File) => {
      formData.append('images', file);
    });

    if (formValue.video) {
      formData.append('video', formValue.video);
    }
    return formData;
  }

  onSubmit() {

    if (this.addPropertyForm.invalid || !this.validateImages()) {
      this.addPropertyForm.markAllAsTouched();

      return;
    }

    const formData = this.buildFormData();
    this.addProperty(formData);

    console.log('FormData جاهز للإرسال:', formData);
  }


  addProperty(formData: FormData) {

    this.propertyService.addNewProperty(formData).subscribe({
      next: (response) => {
        this.route.navigate(['/dashboard/manage-properties'], {
          queryParams: { added: 'true' }
        });
      },
      error: (errorResponse) => {


        // const problemDetails = errorResponse.error;

        // console.log('Errors:', problemDetails.errors);

        // problemDetails.errors.forEach((fieldError: any) => {
        //   console.log('الحقل:', fieldError.field);
        //   fieldError.messages.forEach((msg: any) => {
        //     console.log('الرسالة:', msg.text);
        //     console.log('الكود:', msg.code);
        //   });
        // });
      }
    });

  }
  hasValue(fieldName: string): boolean {
    const control = this.addPropertyForm.get(fieldName);
    return control ? control.touched && control.hasError('required') : false;
  }

  isInvalidNationalId(): boolean {
    const control = this.addPropertyForm.get('ownerNationalId');
    this.validNationalId = !control?.hasError('existsCustomer')

    return this.validNationalId;
  }




}
