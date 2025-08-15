import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../../../core/models/classes/auth/tableColumn';
import { DataService } from '../../../../core/services/data.service';
interface FilterOption {
  label: string;
  value: string;
}
@Component({
  selector: 'app-filtering-section',
  standalone: false,
  templateUrl: './filtering-section.html',
  styleUrl: './filtering-section.css'
})
export class FilteringSection implements OnInit {
  Count = 0; // عدد العناصر
  searchText = '';
  @Output() onSerach: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataservice: DataService) { }
  ngOnInit(): void {
    this.onSerachCompleted();
  }


  onSearchChanged() {
    this.onSerach.emit(this.searchText);
    this.dataservice.setSearch(this.searchText);
  }
  onSearchClicked() {
    this.onSearchChanged();
  }

  onSerachCompleted() {
    this.dataservice.count$.subscribe({
      next: (customersCount: any) => {
        this.Count = customersCount;
      }
    });
  }

  onAddNew() {
    // فتح نافذة إضافة عنصر جديد
  }
  // selectedFilterChanged() {
  //   this.searchValue = '';
  //   this.filterEvent.emit({ filter: this.selectedFilter, value: this.searchValue })
  // }
}
