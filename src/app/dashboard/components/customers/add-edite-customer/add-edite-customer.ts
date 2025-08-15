import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { enMode } from '../../../../shared/enums/en-mode';
import { ICustomer } from '../../../../core/models/Interfaces/Icustomer.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomersService } from '../../../../core/services/customers.service';
import { enCustomerType } from '../../../../shared/enums/en-customerType';
import { enGender } from '../../../../shared/enums/en-gender';
import { format } from "date-fns";
import { Utilities } from "../../../../shared/utilities/utilities"
import { DataService } from '../../../../core/services/data.service';
@Component({
  selector: 'app-add-edite-customer',
  standalone: false,
  templateUrl: './add-edite-customer.html',
  styleUrl: './add-edite-customer.css'
})
export class AddEditeCustomer implements OnInit {

  // shard properties
  customerPreviewImage: string | undefined = "../../../../../assets/img/img--user.png";
  customerImage: File | null = null;
  formTitle: string = '';
  submitButtonText: string = '';
  enMode = enMode
  @Input() mode: enMode = enMode.Add;
  form!: FormGroup;
  disabledSubmit: boolean = true;
  customerType: enCustomerType = enCustomerType.Owner;
  formErrors: string[] = [];


  // edit properties
  customerId: string | undefined = '';
  @Input() customer: ICustomer | null = null;





  // Constructor to inject necessary services
  constructor(private fb: FormBuilder,
    private customersService: CustomersService,
    private route: Router,
    private dataService: DataService,
    private toastrService: ToastrService) {

  }


  ngOnInit(): void {
    if (this.mode == enMode.Add) {
      // 
      this.initializeAddNewMode();

    }
    else if (this.mode == enMode.Update) {
      // Initialize the form for updating an existing property
      this.initializeUpdateMode();

    }


    this.valideidForm();
  }
  initializeUpdateMode() {
    this.createUpdateForm();
    this.formTitle = `تعديل معلومات ${this.customer?.fullName}`
    this.submitButtonText = 'تحديث البيانات'
    this.disabledSubmit = false;
  }
  initializeAddNewMode() {
    this.createAddNewForm();
    this.formTitle = 'اضافة عميل جديد';
    this.submitButtonText = 'اضافة'

  }

  onSubmit() {
    // Check if the form is valid and images are validated before submission

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    // Build the FormData object from the form values
    const formData = this.buildFormData();


    if (this.mode == enMode.Add) {
      this.addCustomer(formData)
    }

    else {
      this.updateCustomer(formData);
    }

  }

  buildFormData(): FormData {
    const formData = new FormData();
    const formValue = this.form.value;
    formData.append('fullName', formValue.fullName)
    formData.append('nationalId', formValue.nationalId)
    formData.append('phoneNumber', formValue.phoneNumber)
    const dob = new Date(formValue.dateOfBirth);

    const formatedDate = format(dob, 'MM/dd/yyyy')

    formData.append('dateOfBirth', formatedDate);
    formData.append('gender', formValue.gender)
    formData.append('customerType', formValue.customerType)

    return formData;
  }


  oncustomerImageSelected(event: any) {

    const file = event.currentFiles[0];
    if (file) {
      this.customerImage = file;
      this.customerPreviewImage = URL.createObjectURL(file);
    }
  }
  getGenderOptions() {
    return [
      { label: 'ذكر', value: enGender.Male },
      { label: 'أنثى', value: enGender.Female }
    ];
  }
  getCustomerTypeOptions() {
    return Utilities.getCustomerTypeArOptions();
  }

  onCustomerTypeSelected(event: any) {
    this.customerType = event.value
  }
  valideidForm() {
    this.form.valueChanges.subscribe(() => {
      if (this.form.invalid) {
        this.disabledSubmit = true;

      }
      else {
        this.disabledSubmit = false;
      }
    });
  }
  // Method to create the form with necessary controls and validators
  createAddNewForm() {

    // Initialize the form with controls and their validators
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      nationalId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],
      gender: [enGender.Male, Validators.required],
      customerType: [enCustomerType.Owner, Validators.required],
    })
  }

  // Method to create the form with necessary controls and validators
  createUpdateForm() {

    this.customerId = this.customer?.customerId ?? '';

    var gender = this.customer?.gender == "Male" ? 0 : 1;
    var customerType: number = Number(this.customer?.customerType);
    // this.customer?.customerType return as string of type name (bayer or seler)
    // Initialize the form with controls and their validators
    this.form = this.fb.group({
      fullName: [this.customer?.fullName, Validators.required],
      nationalId: [this.customer?.nationalId, Validators.required],
      phoneNumber: [this.customer?.phoneNumber, Validators.required],
      dateOfBirth: [new Date(this.customer?.dateOfBirth as string), Validators.required],
      gender: [gender, Validators.required],
      customerType: [customerType, Validators.required],
    })
  }
  addCustomer(formData: FormData) {


    // Call the service to add the new property
    this.customersService.addNewCustomer(formData).subscribe({
      // Handle the response on successful addition of the property
      next: (response) => {
        // Show success message and navigate to the properties list
        this.route.navigate(['/dashboard/customers'], {
          queryParams: { added: 'true' }
        });
      },
      error: (errorResponse) => {

        const problemDetails = errorResponse.error;
        problemDetails.errors.forEach((e: any) => {

          if (e.field === 'nationalId') {
            this.formErrors.push(...this.validateNationalId(e));
          }
          if (e.field === 'phoneNumber') {
            this.formErrors.push(...this.validatePhoneNumber(e));
          }
          if (e.field === 'dateOfBirth') {
            this.formErrors.push(...this.validateDateOfBirth(e));
          }
        })



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

  updateCustomer(formData: FormData) {

    // Call the service to update the customer
    this.customersService.updateCustomer(this.customerId!, formData).subscribe({
      // Handle the response on successful update of the customer
      next: (response) => {

        // Show success message and navigate to the properties list
        this.route.navigate(['/dashboard/customers'], {
          queryParams: { updated: 'true' }
        });
      },
      error: (errorResponse) => {
        // Handle error response 
        const problemDetails = errorResponse.error;
        problemDetails.errors.forEach((e: any) => {

          if (e.field === 'nationalId') {
            this.formErrors.push(...this.validateNationalId(e));
          }
          if (e.field === 'phoneNumber') {
            this.formErrors.push(...this.validatePhoneNumber(e));
          }
          if (e.field === 'dateOfBirth') {
            this.formErrors.push(...this.validateDateOfBirth(e));
          }
        })
      }
    });

  }
  validateNationalId(error: any): string[] {
    const errorMessagesAr: string[] = []
    error.messages.forEach((ms: any) => {
      if (ms.code == 'RequiredField') {
        errorMessagesAr.push('الرقم الوطني مطلوب')
      }

      if (ms.code == 'InvalidFormat') {
        errorMessagesAr.push('الرقم الوطني يجب ان يكون ارقام فقط')
      }
      if (ms.code == 'MinimumLengthViolated') {
        errorMessagesAr.push('الرقم الوطني يجب ان يكون  من 11 رقام فقط')
      }

      if (ms.code == 'MaximumLengthExceeded') {
        errorMessagesAr.push('الرقم الوطني يجب ان يكون  من 11 رقام فقط')
      }
      if (ms.code == 'DuplicateCustomer') {
        var CustomerTypeNameAr = Utilities.getCustomerTypeArabicLabel(this.customerType);
        errorMessagesAr.push(`لا يمكن إنشاء العميل: تم العثور على عميل آخر مسجل بنفس الرقم الوطني كـ ${CustomerTypeNameAr}.`);
      }
    })

    return errorMessagesAr;
  }
  validatePhoneNumber(error: any): string[] {
    const errorMessagesAr: string[] = []
    error.messages.forEach((ms: any) => {
      if (ms.code == 'RequiredField') {
        errorMessagesAr.push('رقم الهاتف مطلوب')
      }

      if (ms.code == 'InvalidFormat') {
        errorMessagesAr.push('قم الهاتف يجب أن يحتوي على أرقام فقط، ويجوز أن يبدأ بعلامة (+)')
      }
      if (ms.code == 'MinimumLengthViolated') {
        errorMessagesAr.push('يجب أن يتكون رقم الهاتف من 9 أرقام على الأقل.')
      }

      if (ms.code == 'MaximumLengthExceeded') {
        errorMessagesAr.push('رقم الهاتف لا يجب أن يتجاوز 15 رقمًا.')
      }
      if (ms.code == 'PhoneAlreadyTaken') {
        errorMessagesAr.push('رقم الهاتف موجود من قبل')
      }
    })

    return errorMessagesAr;
  }
  validateDateOfBirth(error: any): string[] {
    const errorMessagesAr: string[] = []
    error.messages.forEach((ms: any) => {
      if (ms.code == 'RequiredField') {
        errorMessagesAr.push('تاريخ الميلاد مطلوب')
      }

      if (ms.code == 'InvalidFormat') {
        errorMessagesAr.push('قم الهاتف يجب أن يحتوي على أرقام فقط، ويجوز أن يبدأ بعلامة (+)')
      }
      if (ms.code == 'MinimumAgeViolated') {
        errorMessagesAr.push('يجب أن يكون عمرك 18 عامًا على الأقل.')
      }

      if (ms.code == 'MaximumAgeViolated') {
        errorMessagesAr.push('لا يجب أن يتجاوز العمر 120 عامًا.')
      }
    })

    return errorMessagesAr;
  }


}
