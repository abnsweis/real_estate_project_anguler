import { Component, OnInit } from '@angular/core';
import { PaginationResponse } from '../../../core/models/Interfaces/IpaginationResponse.interface';
import { IFavorite } from '../../../core/models/Interfaces/Ifavorite.inteface';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.html',
  styleUrl: './favorite.css',
  standalone: false
})
export class Favorite implements OnInit {

  favorites$!: Observable<PaginationResponse<IFavorite>>;
  favorites: IFavorite[] = [];

  /**
   *
   */
  constructor(private favoritesService: FavoritesService) {

  }



  loadFavorites(): void {
    this.favorites$ = this.favoritesService.getUserFavorites();

    this.favorites$.subscribe({
      next: (value) => {
        this.favorites = value.items
      },
    });
  }
  ngOnInit(): void {

    this.loadFavorites();



  }

}
