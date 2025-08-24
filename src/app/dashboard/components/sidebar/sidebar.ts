import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  @Input() isShowedSidebar: boolean = false;
  @Output() closedSidenar: EventEmitter<void> = new EventEmitter<void>();


  closeSidebar() {
    this.closedSidenar.emit();
  }
  isPropertyDropdownOpen: boolean = false;
  isCustomersDropdownOpen: boolean = false;
  isTransactionsDropdownOpen: boolean = false;

  togglePropertyDropdown() {
    this.isPropertyDropdownOpen = !this.isPropertyDropdownOpen;
  }
  toggleCustomersDropdown() {
    this.isCustomersDropdownOpen = !this.isCustomersDropdownOpen;
  }

  toggleTransactionsDropdown() {
    this.isTransactionsDropdownOpen = !this.isTransactionsDropdownOpen;
  }
}
