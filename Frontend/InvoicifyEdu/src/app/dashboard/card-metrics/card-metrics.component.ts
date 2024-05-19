import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyticsService} from "../../services/analytics.service";
import {Subscription} from "rxjs";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {KesCurrencyPipe} from "../../pipes/kes-currency.pipe";

@Component({
  selector: 'invoice-card-metrics',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    KesCurrencyPipe
  ],
  templateUrl: './card-metrics.component.html',
  styleUrl: './card-metrics.component.css'
})
export class CardMetricsComponent implements OnInit, OnDestroy {
  analyticsSubscription: Subscription = new Subscription();
  collectionCount: number = 0;
  bouncedCheques: number = 0;
  analyticsData: any;
  invoices: any = [];
  signUpCounts: { [key: string]: number } = {
    'Zeraki Analytics': 0,
    'Zeraki Finance': 0,
    'Zeraki Timetable': 0
  };
  totalRevenue: { [key: string]: number } = {
    'Zeraki Analytics': 0,
    'Zeraki Finance': 0,
    'Zeraki Timetable': 0
  };

  constructor(
    private analyticsService: AnalyticsService
  ) {}

  private calculateSignUpCounts() {
    for (let signUp of this.analyticsData) {
      if (this.signUpCounts[signUp.product] !== undefined) {
        this.signUpCounts[signUp.product]++;
      }
    }
  }

  private calculateTotalRevenue() {
    for (let invoice of this.invoices) {
      if (invoice.status === "Completed") {
        if (this.totalRevenue[invoice.item] !== undefined) {
          this.totalRevenue[invoice.item] += invoice.paidAmount;
        }
      }
    }
  }

  ngOnInit(): void {
    // collection count
    this.analyticsSubscription = this.analyticsService.getCollectionMetrics().subscribe((data: any) => {
      this.collectionCount = data.length;
   })

  //   signup stats
    this.analyticsSubscription = this.analyticsService.getSignupMetrics().subscribe((data: any) => {
      this.analyticsData = data;
      this.calculateSignUpCounts();
    });

  //   total revenue
    this.analyticsSubscription = this.analyticsService.getInvoiceMetrics().subscribe((data: any) => {
      this.invoices = data;
      this.calculateTotalRevenue();
    });

  //   get bounced cheques from collections
    this.analyticsSubscription = this.analyticsService.getCollectionMetrics().subscribe((data: any) => {
      this.bouncedCheques = data.filter((collection: any) => collection.status === 'Bounced').length;
    });
  }

  ngOnDestroy(): void {
    this.analyticsSubscription.unsubscribe();
  }
}
