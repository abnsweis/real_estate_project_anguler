import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProperty } from '../../../../core/models/Interfaces/Iproperty.interface';
import { PropertiesService } from '../../../../core/services/propertys.service';

@Component({
  selector: 'app-property-details',
  standalone: false,
  templateUrl: './property-details.html',
  styleUrl: './property-details.css'
})
export class PropertyDetails implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  propertyId: string = '';

  property: IProperty | null = null;
  constructor(
    private sctivatedRoute: ActivatedRoute,
    private router: Router,
    private propertyService: PropertiesService
  ) { }


  ngOnInit(): void {
    this.getPropertIdFromRoute();
  }


  getPropertIdFromRoute() {

    var sub = this.sctivatedRoute.paramMap.subscribe(params => {
      this.propertyId = params.get('propertyId') ?? '';
      this.LoadPropertyDetails();
    });


    this.subscriptions.push(sub);
  }

  LoadPropertyDetails() {
    var sub = this.propertyService.getPropertyById(this.propertyId).subscribe({
      next: (property: IProperty) => {
        this.property = property;
      },
      error: (error) => {
        this.router.navigate(['/dashboard', 'manage-properties'], {
          queryParams: { propertyNotFound: `لم يتم العثور على هاذا العقار ${this.propertyId}` }
        });
      }
    });
    this.subscriptions.push(sub);
  }


  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
