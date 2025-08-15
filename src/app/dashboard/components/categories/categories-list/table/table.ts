import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../../../../../core/models/Interfaces/Icategory.inteface';
import { TableColumn } from '../../../../../core/models/classes/auth/tableColumn';
import { CategoriesService } from '../../../../../core/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../../core/services/data.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-categories-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class CategoriesTable implements OnInit {

  filteredCategories: ICategory[] = [];
  loading = false;
  @Input() categories: ICategory[] = [];
  @Output() onDeletedCategory = new EventEmitter<string>();
  @Output() onUpdatedCategory = new EventEmitter<number>();
  @Output() onAddedCategory = new EventEmitter<number>();
  @Output() countChanged = new EventEmitter<number>();
  @Output() onFilter = new EventEmitter<number>();
  @Input() totalRecords = 0;


  errors: string[] = [];
  visible: boolean = false;
  categoryName: string = '';
  categoryId: string = '';

  private sub!: Subscription;

  constructor(private categoriesService: CategoriesService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.sub = this.dataService.triggerChildFunc$.subscribe(() => {
      this.showAddNewCategoryDialog();
    });
  }
  showAddNewCategoryDialog() {
    console.log('تم تشغيل دالة الولد عبر الخدمة');
    // هنا الكود اللي بدك يشتغل
  }


  confirmDelete(event: Event, categoryId: string) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'هل تريد حذف هذه الفئة',
      header: 'تأكيد الحذف',
      icon: 'pi pi-info-circle',
      acceptLabel: 'حذف',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'حذف',
        severity: 'danger',
      },

      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe({
          next: () => {
            this.onDeletedCategory.emit('تم  حذف الفئة بنجاح ✅');
            this.loadCategories({})
          },
          error: (err) => {
            console.clear()
            console.log(err);
          },
        })
      },
      reject: () => {
      },
    });
  }

  editCategory(event: any) {

  }

  loadCategories(event: any) {
    const lazyEvent = event as LazyLoadEvent;



    // API Call
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.items;
        this.totalRecords = res.totalCount;
        this.filteredCategories = this.categories;

        this.loading = false;
        this.dataService.setCount(this.categories.length)

      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  showUpdateCategoryDialog(categoryId: string, categoryName: string) {
    this.categoryName = categoryName;
    this.categoryId = categoryId;
    this.visible = true;
  }


  updateCategory() {
    this.categoriesService.updateCategory(this.categoryId, this.categoryName).subscribe({
      next: (value) => {
        this.loadCategories({});
        this.closeDialog();
      },
    })
  }

  closeDialog() {
    this.categoryName = '';
    this.categoryId = '';
    this.visible = false;
  }
}
