import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ICategory } from '../../../../core/models/Interfaces/Icategory.inteface';
import { PaginationResponse } from '../../../../core/models/Interfaces/IpaginationResponse.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-filter',
  standalone: false,
  templateUrl: './categories-filter.html',
  styleUrl: './categories-filter.css'
})
export class CategoriesFilter {
  @Input() extraClass: string = '';
  @Output() OnCategorySelected: EventEmitter<string> = new EventEmitter<string>();

  categories$!: Observable<PaginationResponse<ICategory>>;
  constructor(private _categoriesService: CategoriesService) {

    this.categories$ = this._categoriesService.getCategories(1, 10); // Default to page 1 and page size 10

  }


  categotySelected(categoryId: string) {
    console.log(`Category selected: ${categoryId}`);
    this.OnCategorySelected.emit(categoryId);
  }
}
