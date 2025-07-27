import { Component } from '@angular/core';
import { PropertiesService } from '../../../../core/services/propertys.service';
import { IProperty } from '../../../../core/models/Interfaces/Iproperty.interface';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-featured-properties',
  standalone: false,
  templateUrl: './featured-properties.html',
  styleUrl: './featured-properties.css'
})
export class FeaturedProperties {
  featuredProperties: IProperty[] = [];

  constructor(
    private propertiesService: PropertiesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadFeaturedProperties();
  }

  loadFeaturedProperties() {
    this.propertiesService.getFeaturedProperties().subscribe({
      next: (res) => {
        this.featuredProperties = res;
        this.toastr.success('تم تحميل العقارات المميزة بنجاح ✅', 'نجاح');
      },
      error: (error) => {
        console.error('خطأ أثناء تحميل العقارات:', error);
        this.toastr.error('حدث خطأ أثناء تحميل العقارات المميزة ❌', 'خطأ');
      }
    });
  }

}
