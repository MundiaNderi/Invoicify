import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {AnalyticsService} from "../../services/analytics.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'invoice-signups',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './signups.component.html',
  styleUrl: './signups.component.css'
})
export class SignupsComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Zeraki Analytics', 'Zeraki Finance', 'Zeraki Timetable'],
    datasets: [
      { data: [], label: 'primary' },
      { data: [], label: 'Secondary' },
      { data: [], label: 'IGCSE' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDashboardData();
    }
  }

  loadDashboardData(): void {
    this.analyticsService.getSignupChartMetrics().subscribe((data: any) => {
      this.barChartData.datasets[0].data = data.primary;
      this.barChartData.datasets[1].data = data.secondary;
      this.barChartData.datasets[2].data = data.igcse;
      this.updateChart();
    });
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.update();
    }
  }
}
