import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../../../core/models/classes/auth/tableColumn';

@Component({
  selector: 'app-filtering',
  standalone: false,
  templateUrl: './filtering.html',
  styleUrl: './filtering.css'
})
export class Filtering implements OnInit {
  searchValue: string = '';
  @Input() Count: number = 0;
  @Input() CountLable: string = '';
  @Input() ITEMS_FILTER: TableColumn[] = [];

  dropdownOptions: any[] = [];
  selectedFilter!: string;

  @Output() filterEvent: EventEmitter<{ filter: string, value: string }> = new EventEmitter<{ filter: string, value: string }>();

  ngOnInit(): void {
    this.searchValue = '';
    this.selectedFilter = this.ITEMS_FILTER[0].field;
    this.dropdownOptions = this.ITEMS_FILTER.map(col => ({
      label: col.header,
      value: col.field
    }));
  }
  Changed() {
    this.filterEvent.emit({ filter: this.selectedFilter, value: this.searchValue })

  }

  selectedFilterChanged() {
    this.searchValue = '';
    this.filterEvent.emit({ filter: this.selectedFilter, value: this.searchValue })
  }
} 
