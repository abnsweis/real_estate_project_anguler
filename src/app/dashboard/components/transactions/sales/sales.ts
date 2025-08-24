import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IStatisticDTO } from '../../../../core/models/Interfaces/Istatistic.interface';
import { StatisticService } from '../../../../core/services/statistic.service';
import { ISale } from '../../../../core/models/Interfaces/ISale.interface';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { SalesService } from '../../../../core/services/sales.service';

@Component({
  selector: 'app-sales',
  standalone: false,
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales implements OnInit {
  sales: ISale[] = [];
  filteredSales: ISale[] = [];
  totalRecords = 0;
  loading = false;
  pageSize = 20;
  Count = 0;

  @Output() countChanged = new EventEmitter<number>();
  constructor(
    private salesService: SalesService,
    private toastrService: ToastrService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.loading = true;
    this.loadSales({ first: 0, rows: this.pageSize });
  }

  filter(event: { filter: string, value: string }) {
    const filterKey = event.filter;
    const filterValue = event.value.toLowerCase();

    this.filteredSales = this.sales.filter(s => {
      const saleValue = (s[filterKey as keyof ISale] || '').toString().toLowerCase();
      return saleValue.includes(filterValue);
    });

    this.Count = this.filteredSales.length;
    this.countChanged.emit(this.Count);
  }

  loadSales(event: any) {
    const lazyEvent = event as LazyLoadEvent;

    const pageNumber = ((lazyEvent.first ?? 0) / (lazyEvent.rows ?? 5)) + 1;
    const pageSize = lazyEvent.rows ?? 5;

    this.salesService.getSales(pageNumber, pageSize).subscribe({
      next: (res) => {
        this.sales = res.items;
        this.totalRecords = res.totalCount;
        this.filteredSales = this.sales;
        this.loading = false;
        this.Count = res.totalCount;
        this.countChanged.emit(this.Count);
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
