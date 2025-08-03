import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IProperty } from '../../../../core/models/Interfaces/Iproperty.interface';
import { PropertiesService } from '../../../../core/services/propertys.service';
import { TableColumn } from '../../../../core/models/classes/auth/tableColumn';

@Component({
  selector: 'app-propertyies-list',
  standalone: false,
  templateUrl: './propertyies-list.html',
  styleUrl: './propertyies-list.css'
})
export class PropertyiesList implements OnInit {


  @Input() PROPERTY_HEADERS: TableColumn[] = [];
  properties: IProperty[] = [];
  filteredProperties: IProperty[] = [];
  totalRecords = 0;
  loading = false;
  pageSize = 20;
  @Input() filterData!: { filter: string, value: string };


  constructor(private ps: PropertiesService, private confirmationService: ConfirmationService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;

  }
  filter(event: { filter: string, value: string }) {
    const filterKey = event.filter;
    const filterValue = event.value.toLowerCase();

    this.properties = this.filteredProperties.filter(p => {
      const propertyValue = (p[filterKey as keyof IProperty] || '').toString().toLowerCase();
      return propertyValue.includes(filterValue);
    });
  }

  confirmDelete(event: Event, propertyId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'هل تريد حذف هذا العقار؟',
      header: 'تأكيد الحذف',
      icon: 'pi pi-info-circle',
      acceptLabel: 'حذف',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'حذف',
        severity: 'danger',
      },

      accept: () => {
        this.ps.deleteProperty(propertyId).subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 204) {
              this.toastrService.success('تم حذف العقار بنجاح');
              this.loadProperties({ first: 0, rows: this.pageSize })
            }
          },
        })
      },
      reject: () => {
        this.toastrService.warning(`تم الغاء عملية الحذف`);
      },
    });
  }
  loadProperties(event: any) {
    const lazyEvent = event as LazyLoadEvent;

    const pageNumber = ((lazyEvent.first ?? 0) / (lazyEvent.rows ?? 5)) + 1;
    const pageSize = lazyEvent.rows ?? 5;

    // API Call
    this.ps.getPropertiesPage(pageNumber, pageSize).subscribe({
      next: (res) => {
        this.properties = res.items;
        this.totalRecords = res.totalCount;
        this.filteredProperties = this.properties
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
  viewDetails(property: IProperty) {
    console.log('عرض التفاصيل:', property);
  }

  editProperty(property: IProperty) {
    console.log('تعديل العقار:', property);
  }



}
