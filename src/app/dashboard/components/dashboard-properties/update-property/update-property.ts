import { Component, Input, OnInit } from '@angular/core';
import { enMode } from '../../../../shared/enums/en-mode';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperty } from '../../../../core/models/Interfaces/Iproperty.interface';
import { PropertiesService } from '../../../../core/services/propertys.service';

@Component({
  selector: 'app-update-property',
  standalone: false,
  templateUrl: './update-property.html',
  styleUrl: './update-property.css'
})
export class UpdateProperty implements OnInit {
  enMode = enMode
  propertyId: string | undefined = '';
  property: IProperty | null = null;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private ps: PropertiesService) {

  }
  ngOnInit(): void {
    // Get the propertyId from the query parameters
    this.getPropertyIdFromActivatedRoute();

  }

  getPropertyIdFromActivatedRoute() {
    // Get the query parameters from the current route
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.propertyId = params.get('propertyId') ?? undefined;
        this.getPropertyById();
      },
    })
  }


  getPropertyById() {
    if (this.propertyId) {
      this.ps.getPropertyById(this.propertyId).subscribe({
        next: (res) => {
          this.property = res;
        },
        error: (err) => {
          console.error('Error fetching property:', err);
        }
      });
    } else {
      console.warn('No propertyId provided to fetch property details.');
    }
  }
}
