import { Component } from '@angular/core';
import {ChartData, ChartOptions} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {AnalyticsService} from "../../services/analytics.service";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'invoice-target-visuals',
  standalone: true,
  imports: [BaseChartDirective, NgForOf],

  templateUrl: './target-visuals.component.html',
  styleUrl: './target-visuals.component.css'
})
export class TargetVisualsComponent {
  title = 'ng2-charts-demo';

  // Pie chart options
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Set Target', 'Target Achieved'];
  public pieChartData: ChartData<'pie'>[] = [];

  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadTargetData();
  }

  loadTargetData(): void {
    this.analyticsService.getTargetMetrics().subscribe((targetData: any) => {
      this.analyticsService.getSignupMetrics().subscribe((signupData: any) => {
        this.updateChartData(targetData, signupData);
      });
    });
  }

  updateChartData(targetData: any, signupData: any): void {
    const products = ['Zeraki Analytics', 'Zeraki Finance', 'Zeraki Timetable'];
    this.pieChartData = products.map(product => {
      const target = targetData.find((t: any) => t.product === product);
      const signups = signupData.filter((s: any) => s.product === product).length;
      return {
        labels: this.pieChartLabels,
        datasets: [
          {
            data: [target.setTarget, signups],
            backgroundColor: ['#FF6384', '#36A2EB'],
            label: product
          }
        ]
      };
    });
  }
}

