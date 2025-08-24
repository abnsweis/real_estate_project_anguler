import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICustomer } from '../../../../../core/models/Interfaces/Icustomer.interface';
import { CustomersService } from '../../../../../core/services/customers.service';
import { SalesService } from '../../../../../core/services/sales.service';
import { customerExistsByNationalIdValidator } from '../../../../../shared/validators/customer-exists-by-nationalId-validator';
import { Utilities } from '../../../../../shared/utilities/utilities';
import { th } from 'date-fns/locale';
import { IProperty } from '../../../../../core/models/Interfaces/Iproperty.interface';
import { PropertiesService } from '../../../../../core/services/propertys.service';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-sale',
  standalone: false,
  templateUrl: './add-sale.html',
  styleUrl: './add-sale.css'
})
export class AddSale implements OnInit {
  form!: FormGroup;
  buyer: ICustomer | null = null;
  seller: ICustomer | null = null;
  property: IProperty | null = null;

  buyerId: string = '';
  sellerId: string = '';
  propertyId: string = '';
  selectedFile!: File | null;
  disabledSubmit: boolean = true;
  formErrors: { key: string; value: string }[] = [];
  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private propertiesService: PropertiesService,
    private salesService: SalesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createAddNewSaleForm();
    this.valideidForm();
  }


  createAddNewSaleForm() {
    this.form = this.fb.group({
      buyerNationalId: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(11), Validators.maxLength(11)]],
      propertyNumber: ['', [Validators.required, Validators.minLength(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      contractImage: [null, Validators.required]
    });
  }

  // بحث عن المشتري
  searchBuyer() {

  }

  // اختيار صورة العقد
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.form.patchValue({ contractImage: this.selectedFile });

    console.log(this.form.get('contractImage'));
  }
  searchBuyerByNationalId() {

  }
  onContractImagesSelected(event: any) {

  }
  // تجهيز البيانات للإرسال
  buildFormData(): FormData {
    const formData = new FormData();
    formData.append('buyerId', this.buyerId);
    formData.append('propertyId', this.propertyId);
    formData.append('price', this.form.value.price);
    formData.append('description', this.form.value.description || '');
    if (this.selectedFile) {
      formData.append('contractImage', this.selectedFile);
    }
    return formData;
  }

  // إرسال البيانات
  onSubmit() {
    this.updateFieldErrors('buyerNationalId', () => this.validateNationalId());
    this.updateFieldErrors('propertyNumber', () => this.validatePropertyId());
    this.updateFieldErrors('price', () => this.validatePrice());
    this.updateFieldErrors('contractImage', () => this.validateContractImage());
    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;
    }

    const formData = this.buildFormData();
    this.salesService.addNewSale(formData).subscribe({
      next: () => {
        // this.router.navigate(['/dashboard/manage-sales'], {
        //   queryParams: { added: 'true' }
        // });
        alert('done');
      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
        const problemDetails = errorResponse.error;
        problemDetails.errors.forEach((e: any) => {

          if (e.field === 'property') {
            this.updateFieldErrors('propertyNumber', () => this.validatePropertyId(e));
          }
          if (e.field === 'Buyer') {
            this.updateFieldErrors('propertyNumber', () => this.validateNationalId(e));
          }
          // if (e.field === 'phoneNumber') {
          //   this.formErrors.push(...this.validatePhoneNumber(e));
          // }
          // if (e.field === 'dateOfBirth') {
          //   this.formErrors.push(...this.validateDateOfBirth(e));
          // }
        })
      }
    });

  }


  valideidForm() {
    this.disabledSubmit = this.form.invalid;
    this.form.get('buyerNationalId')?.valueChanges.subscribe(() => {
      this.updateFieldErrors('buyerNationalId', () => this.validateNationalId());
    });

    this.form.get('propertyNumber')?.valueChanges.subscribe(() => {
      this.updateFieldErrors('propertyNumber', () => this.validatePropertyId());
    });

    this.form.get('price')?.valueChanges.subscribe(() => {
      this.updateFieldErrors('price', () => this.validatePrice());
    });
    this.form.get('contractImage')?.valueChanges.subscribe(() => {
      this.updateFieldErrors('contractImage', () => this.validateContractImage());
    });


    this.form.valueChanges.subscribe({
      next: () => {
        if (this.form.valid) {
          this.fatchData();
        }
      },
    })

  }

  private updateFieldErrors(fieldName: string, validateFn: () => { key: string; value: string }[]) {
    // مسح الأخطاء القديمة الخاصة بالحقل
    this.formErrors = this.formErrors.filter(e => !e.key.startsWith(fieldName));

    // جلب الأخطاء الجديدة
    const newErrors = validateFn();

    // إضافة الأخطاء الجديدة للقائمة
    this.formErrors.push(...newErrors);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.form.valueChanges.subscribe(() => {
      this.disabledSubmit = this.form.invalid;
    });
  }


  private validateNationalId(field: any | null = null): { key: string, value: string }[] {
    const errors: { key: string, value: string }[] = [];
    const nationalIdField = this.form.get('buyerNationalId');

    if (nationalIdField?.errors) {
      if (nationalIdField.errors['required']) {
        errors.push({ key: 'buyerNationalId_required', value: 'الرقم الوطني مطلوب' });
      }
      if (nationalIdField.errors['pattern']) {
        errors.push({ key: 'buyerNationalId_pattern', value: 'الرقم الوطني يجب أن يحتوي على أرقام فقط' });
      }
      if (nationalIdField.errors['minlength'] || nationalIdField.errors['maxlength']) {
        errors.push({ key: 'buyerNationalId_length', value: 'الرقم الوطني يجب أن يكون 11 رقمًا بالضبط' });
      }
    }
    if (field != null && field?.messages != null) {
      field.messages.forEach((ms: any) => {
        if (ms.code === 'CustomerNotFound') {
          errors.push({ key: 'CustomerNotFound', value: 'لم يتم العثور على المشتري' });
        }
        if (ms.code === 'InvalidGuid') {
          errors.push({ key: 'InvalidGuid', value: 'معرّف المشتري غير صالح' });
        }
      });
    }
    return errors;
  }

  private validatePropertyId(field: any | null = null): { key: string, value: string }[] {
    const errors: { key: string, value: string }[] = [];
    const propertyNumber = this.form.get('propertyNumber');

    if (propertyNumber?.errors) {
      if (propertyNumber.errors['required']) {
        errors.push({ key: 'propertyNumber_required', value: 'رقم العقار مطلوب' });
      }
      if (propertyNumber.errors['minlength']) {
        errors.push({ key: 'propertyNumber_length', value: 'رقم العقار يجب ان يكون اكثر من رقم' });
      }
    }

    if (field != null && field?.messages != null) {

      field.messages.forEach((ms: any) => {
        if (ms.code === 'PropertyNotFound') {
          errors.push({ key: 'PropertyNotFound', value: 'لم يتم العثور على العقار' });
        }
        if (ms.code === 'NotAvailable') {
          errors.push({ key: 'NotAvailable', value: 'هذا العقار غير متاح للبيع' });
        }
        if (ms.code === 'InvalidGuid') {
          errors.push({ key: 'InvalidGuid', value: 'رقم العقار غير صالح' });
        }
      });
    }
    return errors;
  }

  private validatePrice(): { key: string, value: string }[] {
    const errors: { key: string, value: string }[] = [];
    const price = this.form.get('price');

    if (price?.errors) {
      if (price.errors['required']) {
        errors.push({ key: 'price_required', value: 'السعر مطلوب' });
      }
      if (price.errors['min']) {
        errors.push({ key: 'price_min', value: 'السعر يجب أن يكون أكبر من صفر' });
      }
    }

    return errors;
  }
  private validateContractImage(): { key: string; value: string }[] {
    const errors: { key: string; value: string }[] = [];
    const contractImageField = this.form.get('contractImage');

    if (contractImageField?.errors) {
      if (contractImageField.errors['required']) {
        errors.push({ key: 'contractImage', value: 'صورة العقد مطلوبة' });
      }
    }

    return errors;
  }

  private fatchData() {
    if (this.form.valid) {
      forkJoin({
        propertyData: this.getProperty(),
        buyer: this.getBuyer()
      }).subscribe({
        next: ({ propertyData, buyer }) => {
          console.log(propertyData.property, propertyData.seller, buyer);
          this.buyer = buyer;
          this.buyerId = buyer?.customerId ?? '';
        },
        error: err => console.error(err)
      });


    }
  }

  private getProperty(): Observable<{ property: IProperty; seller: ICustomer }> {
    const propertyNumber = this.form.get('propertyNumber')?.value;

    return this.propertiesService.getPropertyByPropertyNumber(propertyNumber).pipe(
      switchMap(property => {
        this.property = property;
        this.propertyId = property.propertyId;
        this.sellerId = property.ownerId;
        return this.customersService.getCustomerByCustomerId(this.sellerId).pipe(
          map(seller => {
            this.seller = seller;
            return { property, seller };
          })
        );
      })
    );
  }


  private getBuyer(): Observable<ICustomer | null> {
    const buyerNationalId = this.form.get('buyerNationalId')?.value;
    return this.customersService.getCustomerByNationalId(buyerNationalId)
  }

}
