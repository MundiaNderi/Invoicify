import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetVisualsComponent } from './target-visuals/target-visuals.component';
import { CardMetricsComponent } from "./card-metrics/card-metrics.component";
import { SignupsComponent } from './signups/signups.component';
import { InvoicesComponent } from './upcoming-invoices/invoices.component';
@Component({
  standalone: true,
  selector: 'invoice-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports:
    [
      CommonModule,
      TargetVisualsComponent,
      CardMetricsComponent,
      SignupsComponent,
      InvoicesComponent
    ],
})
export class DashboardComponent { }
