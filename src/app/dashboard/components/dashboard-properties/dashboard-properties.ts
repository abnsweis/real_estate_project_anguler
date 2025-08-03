import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../../../core/services/propertys.service';
import { IProperty } from '../../../core/models/Interfaces/Iproperty.interface';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastrService } from 'ngx-toastr';
import { TableColumn } from '../../../core/models/classes/auth/tableColumn';
import { PropertyiesList } from './propertyies-list/propertyies-list';
@Component({
  selector: 'app-dashboard-properties',
  standalone: false,
  templateUrl: './dashboard-properties.html',
  styleUrl: './dashboard-properties.css',
})
export class DashboardProperties implements OnInit {
  PROPERTY_HEADERS: TableColumn[] = [
    { field: 'propertyNumber', header: 'رقم العقار' },
    { field: 'address', header: 'العنوان' },
    { field: 'status', header: 'الحالة' },
    { field: 'area', header: 'المساحة' },
    { field: 'price', header: 'السعر' },
    { field: 'ownerFullName', header: 'المالك' },
    { field: 'ownerNationalId', header: 'الرقم الوطني' },
  ];
  filterEventData = { filter: '', value: '' };
  @ViewChild('listComponent') listComponent!: PropertyiesList;

  onFilterEvent(event: { filter: string; value: string }) {
    this.listComponent.filter(event);
  }

  ngOnInit(): void { }
}
