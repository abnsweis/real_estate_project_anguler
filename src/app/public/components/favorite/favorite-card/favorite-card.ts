import { Component, Input } from '@angular/core';
import { IFavorite } from '../../../../core/models/Interfaces/Ifavorite.inteface';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite-card',
  standalone: false,
  templateUrl: './favorite-card.html',
  styleUrl: './favorite-card.css'
})
export class FavoriteCard {

  @Input() favorite: IFavorite | null = null;
  constructor(private favoritesService: FavoritesService, private toastr: ToastrService) {

  }
  RemoveFromFavorite() {
    this.favoritesService.removeFromFavorite(this.favorite?.propertyId ?? '').subscribe({
      next: (value) => {
        this.toastr.success('تم ازالته من المفضلة');
      },
      error: (error) => {
        this.toastr.error('فشلة عملية ازالة العقار من المفضلة الرجاء المحاولة مرة اخرى');
      }
    });
  }
}
