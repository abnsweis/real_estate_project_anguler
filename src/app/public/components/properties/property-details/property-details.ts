import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IProperty } from '../../../../core/models/Interfaces/Iproperty.interface';
import { IComment } from '../../../../core/models/Interfaces/Icomment.interface';
import { PaginationResponse } from '../../../../core/models/Interfaces/IpaginationResponse.interface';
import { PropertiesService } from '../../../../core/services/propertys.service';
import { CommentsService } from '../../../../core/services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.html',
  styleUrls: ['./property-details.css']
  , standalone: false
})
export class PropertyDetails implements OnInit {
  propertyId: string = '';
  property!: IProperty;
  comments!: PaginationResponse<IComment>;
  value2: string | undefined;
  visibleImagesDialog: boolean = false;
  visibleImagesVideos: boolean = false;

  // خيارات الصور إللي عندك
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 }
  ];

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService,
    private commentsService: CommentsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(params => {
        this.propertyId = params.get('propertyId') || '';
        if (!this.propertyId) {
          this.router.navigate(['/not-found']);
        }
      }),
      switchMap(() => {
        // استعمل forkJoin لتجميع العقار والتعليقات
        return forkJoin({
          property: this.propertiesService.getPropertyById(this.propertyId),
          comments: this.commentsService.getProprtyComments(this.propertyId)
        });
      })
    ).subscribe({
      next: ({ property, comments }) => {
        this.property = property;
        this.comments = comments;
      },
      error: err => {
        console.error(err);
        if (err.status === 404) {
          this.router.navigate(['/not-found']);
        }
      }
    });
  }

  imageClick(index: number) {
    // كود عرض الصورة
  }

  showImages() {
    this.visibleImagesDialog = true;
  }

  showVideo() {
    this.visibleImagesVideos = true;
  }

  getMappedImages(): any[] {
    return this.property?.images?.map(img => ({
      itemImageSrc: `${img}`,
      thumbnailImageSrc: `${img}`,
      alt: 'صورة عقار',
      title: 'صورة'
    })) || [];
  }

  AddComment(commentText: string) {

    if (!commentText.trim()) {
      this.toastr.warning('التعليق فارغ، يرجى كتابته أولاً.');
      return;
    }
    this.toastr.info(this.propertyId);
    this.commentsService.addNewComment(this.propertyId, commentText).subscribe({
      next: () => {
        this.toastr.success('تم اضافة التعليق بنجاح ✅');
      },
      error: (error) => {

        console.log(error.error)

        this.toastr.error('فشل اضافة التعليق الرجاء المحاولة مرة اخرى.');
      }
    });

  }
}
