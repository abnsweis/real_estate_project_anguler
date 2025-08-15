import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoriesList } from './categories-list/categories-list';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {

  @ViewChild('categoriesList') categoriesList!: CategoriesList;

  addedCategorySuccessfully() {
    this.categoriesList.table.loadCategories({})
  }
}
