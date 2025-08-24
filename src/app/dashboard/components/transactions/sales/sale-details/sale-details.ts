import { Component, Input, OnInit } from '@angular/core';
import { IProperty } from '../../../../../core/models/Interfaces/Iproperty.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../../../../core/services/customers.service';
import { PropertiesService } from '../../../../../core/services/propertys.service';
import { ISale } from '../../../../../core/models/Interfaces/ISale.interface';
import { ICustomer } from '../../../../../core/models/Interfaces/Icustomer.interface';
import { SalesService } from '../../../../../core/services/sales.service';
import { th } from 'date-fns/locale';
import { switchMap, forkJoin } from 'rxjs';

@Component({
  selector: 'app-sale-details',
  standalone: false,
  templateUrl: './sale-details.html',
  styleUrl: './sale-details.css'
})
export class SaleDetails implements OnInit {

  property!: IProperty;
  sale: ISale | null = null;
  seller: ICustomer | null = null;
  buyer: ICustomer | null = null;
  saleId: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customersService: CustomersService,
    private salesService: SalesService,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.saleId = params.get('saleId') ?? '';
      this.loadSaleDetails();
    });
  }
  loadSaleDetails() {
    this.salesService.getSaleById(this.saleId).pipe(
      switchMap(sale => {
        if (!sale) {
          throw new Error('Sale not found');
        }
        this.sale = sale;

        // هون عم نجمع الثلاث ركويستات
        return forkJoin({
          seller: this.customersService.getCustomerByCustomerId(sale.sellerId),
          buyer: this.customersService.getCustomerByCustomerId(sale.buyerId),
          property: this.propertiesService.getPropertyById(sale.propertyId)
        });
      })
    ).subscribe({
      next: ({ seller, buyer, property }) => {
        this.seller = seller;
        this.buyer = buyer;
        this.property = property;
      },
      error: (error) => {
        console.error(error);
        // this.router.navigate(['/dashboard', 'manage-properties'], {
        //   queryParams: { errorMessage: error.message || 'حدث خطأ أثناء تحميل البيانات' }
        // });
      }
    });
  }

  downloadImage(): void {
    const link = document.createElement('a');
    link.href = this.sale?.contractImageUrl ?? '';
    link.download = 'my-image.jpg'; // Desired filename for the downloaded image
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
