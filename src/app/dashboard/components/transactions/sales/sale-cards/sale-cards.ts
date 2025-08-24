import { Component } from '@angular/core';
import { SalesStatistics } from '../../../../../core/models/Interfaces/ISales-statistics.inteface';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from '../../../../../core/services/sales.service';

@Component({
  selector: 'app-sale-cards',
  standalone: false,
  templateUrl: './sale-cards.html',
  styleUrl: './sale-cards.css'
})
export class SaleCards {
  statistic!: SalesStatistics;
  titles: string[] = ['إجمالي المبيعات الكلي', 'المبيعات هذا الشهر', 'العقارات المتاحة', 'العقارات المباعة'];

  constructor(private statisticService: SalesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadStatistic();
  }

  private loadStatistic(): void {
    this.statisticService.getSalesStatistics().subscribe({
      next: (statistics: SalesStatistics) => {
        this.statistic = statistics;
      },
      error: (err) => {
        this.toastr.error('فشل تحميل الإحصائيات', err);
      }
    });
  }
}
