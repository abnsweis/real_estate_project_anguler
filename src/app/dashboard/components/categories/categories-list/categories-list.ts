import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategoriesTable } from './table/table';
import { DataService } from '../../../../core/services/data.service';
import { CategoriesService } from '../../../../core/services/categories.service';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-categories-list',
  standalone: false,
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.css'
})
export class CategoriesList {
  @ViewChild('CategoriesTable') table!: CategoriesTable;
  successfullyAddedCategory: boolean = false;
  successfullyUpdateCategory: boolean = false;
  successfullyDeleteCategory: boolean = false;

  constructor(private categoriesService: CategoriesService) {

  }

  onDeleteCategory() {
    this.successfullyDeleteCategory = true;
  }

}
