import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../../core/services/categories.service';
import { CustomersService } from '../../../../core/services/customers.service';
import { PropertiesService } from '../../../../core/services/propertys.service';
import { customerExistsByNationalIdValidator } from '../../../../shared/validators/customer-exists-by-nationalId-validator copy';
import { debounceTime } from 'rxjs';
import { ICategory } from '../../../../core/models/Interfaces/Icategory.inteface';
import { enMode } from '../../../../shared/enums/en-mode';
import { IProperty } from '../../../../core/models/Interfaces/Iproperty.interface';
import { ToastrService } from 'ngx-toastr';
import { FileRemoveEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-add-update-property',
  standalone: false,
  templateUrl: './add-update-property.html',
  styleUrl: './add-update-property.css'
})
export class AddUpdateProperty implements OnInit {

  enMode = enMode
  @Input() mode: enMode = enMode.Add;

  propertyId: string | undefined = '';
  @Input() property: IProperty | null = null;

  // Properties to hold categories and selected category
  categories: any[] = [];
  selectedCategory: number | undefined;

  // Properties to hold form data and validation states
  validNationalId: boolean = false;
  disabledSubmit: boolean = true;
  ownerNationalId: string | undefined;

  // Form group for the add property form
  form!: FormGroup;
  // Constructor to inject necessary services
  constructor(private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private customersService: CustomersService,
    private route: Router,
    private toastrService: ToastrService,
    private propertyService: PropertiesService) {

  }

  // Lifecycle hook to initialize the component
  ngOnInit(): void {


    // Load categories and create the form
    this.loadCategoryies();

    if (this.mode == enMode.Add) {
      // Initialize the form for adding a new property
      this.initializeAddNewMode();

    }
    else if (this.mode == enMode.Update) {
      // Initialize the form for updating an existing property
      this.initializeUpdateMode();
      this.ownerNationalId = this.property?.ownerNationalId;

    }



    this.form.valueChanges.subscribe(() => {
      if (this.form.invalid || !this.validateImages()) {
        this.disabledSubmit = true;

      }
      else {
        this.disabledSubmit = false;
      }
    });

  }





  // Method to initialize the form for adding a new property
  initializeAddNewMode() {

    // Create the form with necessary controls and validators
    this.createAddNewForm();
    // Listen to changes in the ownerNationalId field for validation
    this.listenToOwnerValidation();
  }

  // Method to initialize the form for updating an existing property
  initializeUpdateMode() {
    this.createUpdateForm();
  }

  // Method to create the form with necessary controls and validators
  createAddNewForm() {

    // Initialize the form with controls and their validators
    this.form = this.fb.group({
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


  createUpdateForm() {

    // If property is provided, set the propertyId and patch the form with existing values
    this.propertyId = this.property?.propertyId || '';

    // Initialize the form with controls and their validators
    this.form = this.fb.group({
      title: [this.property?.title || '', Validators.required],
      ownerNationalId: [this.property?.ownerNationalId || '', [Validators.required], [customerExistsByNationalIdValidator('', this.customersService)]],
      categoryId: [`${this.selectedCategory}`, Validators.required],
      price: [this.property?.price || null, Validators.required],
      area: [this.property?.area || null, Validators.required],
      location: [this.property?.location || '', Validators.required],
      address: [this.property?.address || '', Validators.required],
      description: [this.property?.description || '', Validators.required],
      images: [[null], Validators.required],
      video: [null],
    });


  }






  // Method to handle file selection for images
  onImagesSelected(event: any) {
    // Get the FileList from the event
    const files: FileList = event.originalEvent.target.files;

    // Convert FileList to an array of File objects
    const filesArray: File[] = Array.from(files);

    // Update the form control with the selected files
    this.form.patchValue({ images: filesArray });

    // Mark the control as touched and update its validity
    this.form.get('images')?.markAsTouched();
    // Update the validity of the form control
    this.form.get('images')?.updateValueAndValidity();


    if (this.form.invalid || !this.validateImages()) {
      this.form.markAllAsTouched();
      this.disabledSubmit = true;
      return;
    }
    else {
      this.disabledSubmit = false;
    }

  }

  // Method to handle file selection for video
  onVideoSelected(event: any) {
    // Get the FileList from the event
    const files: File[] = event.files;
    // Check if files are selected and update the form control
    if (files && files.length > 0) {
      // Assuming only one video file is selected
      const file = files[0];

      // Update the form control with the selected video file
      this.form.patchValue({ video: file });
      // Mark the control as touched and update its validity
      this.form.get('video')?.markAsTouched();
      // Update the validity of the form control
      this.form.updateValueAndValidity();
    }
  }
  onRemove(event: any) {
    const imagesControl = this.form.get('images');
    const currentImages = imagesControl?.value || [];

    console.log(currentImages);
    const updatedImages = currentImages.filter((img: any) => img !== event.file);

    imagesControl?.setValue(updatedImages);
    console.log(updatedImages);

    // التحقق
    this.disabledSubmit = !this.validateImages();
  }



  // Method to load categories from the service
  loadCategoryies() {
    // Call the service to get categories and map them to the required format
    this.categoriesService.getCategories(1, Number.MAX_VALUE).subscribe({
      // Handle the response and map categories to the required format
      next: (res) => {
        // Map the categories to the format required by the dropdown
        this.categories = res.items.map((category: ICategory) => ({
          label: category.categoryName,
          value: category.categoryId
        }));

        // Set the first category as the selected category
        this.selectedCategory = this.categories[0]?.value;

        // Patch the form with the selected category
        if (this.form) {
          this.form.patchValue({ categoryId: this.selectedCategory });
        }
      },
    });
  }

  // Method to validate the images field
  validateImages(): boolean {
    // Get the images control from the form
    const imagesControl = this.form.get('images');

    // Check if the images control is empty or has no files selected
    if (imagesControl?.value[0] == null) {
      // If no images are selected, set the error state
      imagesControl?.setErrors({ required: true });
      this.disabledSubmit = true;
      return false;
    }
    // If the images control is valid, clear any errors
    imagesControl.setErrors(null);
    this.disabledSubmit = false;
    return true;
  }

  buildFormData(): FormData {
    // Create a new FormData object to hold the form data
    const formData = new FormData();

    // Append form values to the FormData object
    const formValue = this.form.value;

    // Append each field to the FormData object
    formData.append('title', formValue.title);
    formData.append('ownerNationalId', formValue.ownerNationalId);
    formData.append('categoryId', formValue.categoryId);
    formData.append('price', formValue.price);
    formData.append('area', formValue.area);
    formData.append('location', formValue.location);
    formData.append('address', formValue.address);
    formData.append('propertyStatus', formValue.propertyStatus);
    formData.append('description', formValue.description);


    // Append images to the FormData object
    const images: File[] = formValue.images || [];
    images.forEach((file: File) => {
      formData.append('images', file);
    });

    // Append video if it exists
    if (formValue.video) {
      formData.append('video', formValue.video);
    }
    // Return the FormData object containing all the form data
    return formData;
  }

  onSubmit() {
    // Check if the form is valid and images are validated before submission
    if (this.form.invalid || !this.validateImages()) {
      this.form.markAllAsTouched();

      return;
    }

    // Build the FormData object from the form values
    const formData = this.buildFormData();




    if (this.mode == enMode.Add) {
      // Call the method to add the property with the FormData
      this.addProperty(formData);

    }
    else if (this.mode == enMode.Update) {
      // Call the method to update the property with the FormData
      this.updateProperty(formData);
    }


  }


  // Method to add a new property using the FormData
  addProperty(formData: FormData) {

    // Call the service to add the new property
    this.propertyService.addNewProperty(formData).subscribe({
      // Handle the response on successful addition of the property
      next: (response) => {
        // Show success message and navigate to the properties list
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

  updateProperty(formData: FormData) {

    // Call the service to update the property
    this.propertyService.updateProperty(this.propertyId!, formData).subscribe({
      // Handle the response on successful update of the property
      next: (response) => {

        // Show success message and navigate to the properties list
        this.route.navigate(['/dashboard/manage-properties'], {
          queryParams: { updated: 'true' }
        });
      },
      error: (errorResponse) => {
        // Handle error response 
        const problemDetails = errorResponse.error;

      }
    });

  }
  // Method to check if a form field has a value and is touched
  hasValue(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.touched && control.hasError('required') : false;
  }


  // Method to listen to changes in the ownerNationalId field for validation
  listenToOwnerValidation(): void {
    const control = this.form.get('ownerNationalId');
    // Check if the control exists
    control?.statusChanges
      .pipe(debounceTime(100))
      .subscribe((status) => {
        if (status === 'VALID') {
          this.onValidOwnerNationalId(control.value);
        }
      });
  }
  onValidOwnerNationalId(value: string): void {
    this.ownerNationalId = value;
  }




}