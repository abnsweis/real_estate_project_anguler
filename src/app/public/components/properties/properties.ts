import { Component } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { PaginationResponse } from '../../../core/models/Interfaces/IpaginationResponse.interface';
import { IProperty } from '../../../core/models/Interfaces/Iproperty.interface';
import { PropertiesService } from '../../../core/services/propertys.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-properties',
  standalone: false,
  templateUrl: './properties.html',
  styleUrl: './properties.css'
})
export class Properties {
  properties$!: Observable<PaginationResponse<IProperty>>;
  constructor(
    private propertiesService: PropertiesService,
    private toastr: ToastrService
  ) { }

  loadProperties() {
    this.properties$ = this.propertiesService.getPropertiesPage(1, 10);

  }
  ngOnInit(): void {
    this.loadProperties();
  }

  CategorySelected(categoryId: string) {
    if (categoryId == '') {
      this.loadProperties();
    }
    else {
      this.properties$ = this.propertiesService.getPropertiesByCategory(categoryId, 1, 10);
    }
    this.toastr.success("تم تحميل العقارات بنجاح", "نجاح");
  }
}
