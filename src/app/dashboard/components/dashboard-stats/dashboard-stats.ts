import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../../core/services/statistic.service';
import { IStatisticDTO } from '../../../core/models/Interfaces/Istatistic.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-stats',
  standalone: false,
  templateUrl: './dashboard-stats.html',
  styleUrl: './dashboard-stats.css'
})
export class DashboardStats implements OnInit {

  statistic: IStatisticDTO[] = [];

  constructor(private statisticService: StatisticService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadStatistic();
  }

  private loadStatistic(): void {
    this.statisticService.getStatistics().subscribe({
      next: (statistics: IStatisticDTO[]) => {
        this.statistic = statistics;
      },
      error: (err) => {
        this.toastr.error('فشل تحميل الإحصائيات', err);
      }
    });
  }
}
