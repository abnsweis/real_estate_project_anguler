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
import { FavoritesService } from '../../../../core/services/favorites.service';
import { RatingsService } from '../../../../core/services/ratings.service';
import { IRating } from '../../../../core/models/Interfaces/Irating.inteface';

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
  ratings: IRating[] = [];
  isRating: boolean = false;

  visibleImagesDialog: boolean = false;
  visibleImagesVideos: boolean = false;
  visibleRatingDialog: boolean = false;
  ratingValue: number = 1;
  ratingText: string = '';

  inFavorite: boolean = false;
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
    private favoritesService: FavoritesService,
    private ratingsService: RatingsService,
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
      error: (err) => {
        if (err.status === 404) {
          this.router.navigate(['/not-found']);
        }
        console.log(err)
      }
    });

    this.IsInFavorite();
    this.loadRatings();
    this.isRatingProperty();
  }

  AddNewRating() {

    if (this.ratingText.length <= 0) {
      this.toastr.error("نص التقييم يجب ان لا يكون فارغاً");
      return;
    }
    if (this.ratingValue <= 0) {
      this.toastr.error("يرجى اختيار تقييم قبل إرسال المراجعة");
      return;
    }

    alert('00');
    this.ratingsService.addRating(this.propertyId, this.ratingText, this.ratingValue).subscribe({
      next: (value) => {
        this.toastr.success('تم اضافة التقييم بنجاح')
        this.visibleRatingDialog = false;
        this.loadRatings();
        this.isRating = true;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('فشل اضافة التقييم الرجاء المحاولة مرة اخرى في وقف لاحق')
      },
    })
  }


  isRatingProperty() {
    this.ratingsService.isPropertyRated(this.propertyId).subscribe({
      next: (value) => {
        console.log(value);
        if (value) {
          this.isRating = true;
        }
        else {
          this.isRating = false;

        }

      }
    });
  }


  loadRatings() {
    this.ratingsService.getPropertyRatings(this.propertyId).subscribe({
      next: (res) => {

        this.ratings = res.items;

      },
    });
  }

  ratingDialog() {
    this.visibleRatingDialog = true;
  }
  private IsInFavorite() {
    this.favoritesService.IsInFavorite(this.propertyId).subscribe({
      next: (res: any) => {
        this.inFavorite = res.isInFavorite;
      },
    });
  }
  RemoveFromFavorite() {
    this.favoritesService.removeFromFavorite(this.propertyId).subscribe({
      next: (value) => {
        this.toastr.success('تم ازالته من المفضلة');
        this.inFavorite = false;
      },
      error: (error) => {
        this.toastr.error('فشلة عملية ازالة العقار من المفضلة الرجاء المحاولة مرة اخرى');

      }
    });
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


  loadComments() {
    this.commentsService.getProprtyComments(this.propertyId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        this.toastr.error('حدث خطأ أثناء تحديث التعليقات.');
      }
    });
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
        this.loadComments();
      },
      error: (error) => {

        this.toastr.error('فشل اضافة التعليق الرجاء المحاولة مرة اخرى.');
      }
    });

  }


  AddTofavorite() {
    this.favoritesService.AddTofavorite(this.propertyId).subscribe({
      next: (value) => {
        this.toastr.success('تم اضافته الى المفضلة');
        this.inFavorite = true;
      },
      error: (error) => {
        this.toastr.error('فشلة عملية اضافة العقار الى المفضلة الرجاء المحاولة مرة اخرى');
      }
    });
  }




  commentText: string = '';
  commentId: string = '';
  visibleUpdateCommentPopp: boolean = false;
  showVisibleUpdateCommentPoppDialog(commentInfo: { commentText: string; commentId: string }) {
    this.visibleUpdateCommentPopp = true;

    this.commentText = commentInfo.commentText
    this.commentId = commentInfo.commentId
  }
  saveComment() {
    this.commentsService.updateComment(this.commentId, this.commentText).subscribe({
      next: (value) => {
        this.toastr.success('تم تحديث التعليق بنجاح');
        this.visibleUpdateCommentPopp = false;
        this.loadComments();
      },
      error: (error) => {
        console.log(error.error)
        this.toastr.error('فشلة عملية تحديث التعليق الرجاء المحاولة مرة اخرى');
      }
    });
  }
}
