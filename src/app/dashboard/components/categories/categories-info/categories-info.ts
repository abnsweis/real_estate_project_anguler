import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { CategoriesService } from '../../../../core/services/categories.service';

@Component({
  selector: 'app-categories-info',
  standalone: false,
  templateUrl: './categories-info.html',
  styleUrl: './categories-info.css'
})
export class CategoriesInfo implements OnInit {
  Count = 0;
  errors: string[] = [];
  visible: boolean = false;
  newCategoryName: string = '';
  @Output() categoryAddedSuccessfully: EventEmitter<void> = new EventEmitter<void>();
  constructor(private dataservice: DataService, private categoriesService: CategoriesService) { }
  ngOnInit(): void {
    this.onCountChanged();
  }
  onCountChanged() {
    this.dataservice.count$.subscribe({
      next: (categoriesCount: any) => {
        this.Count = categoriesCount;
      }
    });
  }




  showAddNewCategoryDialog() {
    this.visible = true;
  }



  addCategory() {
    if (this.newCategoryName != '') {

      this.categoriesService.addNewCategory(this.newCategoryName).subscribe({
        next: (value) => {
          this.categoryAddedSuccessfully.emit();
          this.visible = false;
        },
        error: (errorResponse) => {
          const problemDetails = errorResponse.error;
          console.log(problemDetails);
          problemDetails.errors.forEach((e: any) => {

            if (e.field === 'Category') {
              this.errors.push(...this.validateCategoryName(e));
            }
          })

        },
      })
    }
  }

  validateCategoryName(error: any): string[] {
    const errorMessagesAr: string[] = []
    error.messages.forEach((ms: any) => {
      if (ms.code == "CategoryNameAlreadyExists") {
        errorMessagesAr.push('اسم هذه الفئة وجود من قبل')
      }

    })

    return errorMessagesAr;
  }
}
