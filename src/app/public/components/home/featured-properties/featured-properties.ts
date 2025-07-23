import { Component } from '@angular/core';
import { PropertiesService } from '../../../../core/services/propertys.service';
import { IProperty } from '../../../../core/models/Interfaces/Iproperty.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-featured-properties',
  standalone: false,
  templateUrl: './featured-properties.html',
  styleUrl: './featured-properties.css'
})
export class FeaturedProperties {
  featuredProperties$!: Observable<IProperty[]>;

  constructor(private _service: PropertiesService) { }

  ngOnInit(): void {
    // this.featuredProperties$ = this._service.getPropertiesPage(1, 10);
  }
}
