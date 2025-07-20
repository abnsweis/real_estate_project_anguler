import { Component, model } from '@angular/core';
import { Observable } from 'rxjs';
import { IProperty } from '../../../../core/models/property.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertiesService } from '../../../../core/services/propertys.service';

@Component({
  selector: 'app-property-details',
  standalone: false,
  templateUrl: './property-details.html',
  styleUrl: './property-details.css'
})
export class PropertyDetails {
  visibleImagesDialog: boolean = false;
  visibleImagesVideos: boolean = false;

  propertyId: string = '';
  property$!: Observable<IProperty>;
  property!: IProperty;
  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService,
    private router: Router) {

  }
  displayCustom: boolean | undefined;

  activeIndex: number = 0;

  images = model([]);

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }
  showImages() {
    this.visibleImagesDialog = true;
  }

  showVideo() {
    this.visibleImagesVideos = true;
  }
  ngOnInit(): void {

    // Subscribe to the route parameters to get the property ID
    this.route.paramMap.subscribe(p => {
      this.propertyId = p.get('propertyId') || '';
      console.log('Property ID:', this.propertyId);
    });
    this.propertiesService.getPropertyById(this.propertyId).subscribe(
      {
        next: (data) => {
          this.property = data
        },
        error: (err) => {
          console.log(err);
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
          }
        }
      }
    );




  }




  getMappedImages(): any[] {
    return this.property?.images?.map(img => {
      return {
        itemImageSrc: `${img}`, // أو المسار الكامل من الـ API
        thumbnailImageSrc: `${img}`, // أو نفس الصورة لو ما عندك معاينة
        alt: 'صورة عقار',
        title: 'صورة'
      };
    });
  }


}
