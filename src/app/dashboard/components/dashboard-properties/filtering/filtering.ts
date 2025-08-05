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
  @Input() propertyiesCount: number = 0;
  @Input() PROPERTY_HEADERS_FILTER: TableColumn[] = [];

  dropdownOptions: any[] = [];
  selectedFilter!: string;

  @Output() filterEvent: EventEmitter<{ filter: string, value: string }> = new EventEmitter<{ filter: string, value: string }>();

  ngOnInit(): void {
    this.searchValue = '';
    this.selectedFilter = this.PROPERTY_HEADERS_FILTER[0].field;
    this.dropdownOptions = this.PROPERTY_HEADERS_FILTER.map(col => ({
      label: col.header,
      value: col.field
    }));
  }
  Changed() {
    this.filterEvent.emit({ filter: this.selectedFilter, value: this.searchValue })

  }
} 
