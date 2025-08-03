import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IMonthlyFinancialSummaryDTO } from '../../../core/models/Interfaces/monthlyFinancialSummaryDTO.interface'
import { StatisticService } from '../../../core/services/statistic.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-charts',
  standalone: false,
  templateUrl: './charts.html',
  styleUrl: './charts.css'
})
export class Charts implements OnInit, AfterViewInit {
  monthlySales: IMonthlyFinancialSummaryDTO[] = [];
  monthlyRentals: IMonthlyFinancialSummaryDTO[] = [];
  totalSalesRevenue: number = 0;
  totalRentalsRevenue: number = 0;
  constructor(private statisticService: StatisticService) {
    Chart.register(...registerables)
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.loadChartsData();


  }


  renderChart() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        // labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        labels: this.monthlySales.map(s => s.monthName),
        datasets: [{
          label: 'المبيعات الشهرية',
          data: this.monthlySales.map(s => s.total),
          backgroundColor: 'rgba(0, 123, 255, 0.6)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 2
        },
        {
          label: 'الإيجارات الشهرية',
          data: this.monthlyRentals.map(s => s.total),
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderRevenuePieChart() {
    const ctx = document.getElementById('revenuePieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['المبيعات', 'الإيجارات'],
        datasets: [{
          data: [this.totalSalesRevenue, this.totalRentalsRevenue],
          backgroundColor: ['rgba(0, 123, 255, 0.7)', 'rgba(255, 193, 7, 0.7)'],
          borderColor: ['rgba(0, 123, 255, 1)', 'rgba(255, 193, 7, 1)'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 16
              }
            }
          }
        }
      }
    });
  }


  loadChartsData() {
    forkJoin({
      monthlySales: this.statisticService.getMonthlySales(),
      monthlyRentals: this.statisticService.getMonthlyRentals(),
      totalSalesRevenueResponse: this.statisticService.getTotalSalesRevenue(),
      totalRentalsRevenueResponse: this.statisticService.getTotalRentalsRevenue(),
    }).subscribe({
      next: (res) => {
        this.handleChartData(res);
      },
      error: (err) => {
        console.error('Failed to load chart data:', err);
      }
    });
  }

  private handleChartData(res: {
    monthlySales: any[];
    monthlyRentals: any[];
    totalSalesRevenueResponse: { totalSalesRevenue: number };
    totalRentalsRevenueResponse: { totalRentalsRevenue: number };
  }) {
    this.monthlySales = res.monthlySales;
    this.monthlyRentals = res.monthlyRentals;
    this.totalSalesRevenue = res.totalSalesRevenueResponse.totalSalesRevenue;
    this.totalRentalsRevenue = res.totalRentalsRevenueResponse.totalRentalsRevenue;

    this.renderChart();
    this.renderRevenuePieChart();
  }

}
