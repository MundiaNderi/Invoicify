import {DatePipe, NgFor} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyticsService} from "../../services/analytics.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PaymentModalComponent} from "./payment-modal/payment-modal.component";
import {UpcomingInvoices} from "../../interfaces/upcoming-invoices";
import {KesCurrencyPipe} from "../../pipes/kes-currency.pipe";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'invoice-upcoming-invoices',
  standalone: true,
  imports: [NgFor, KesCurrencyPipe, DatePipe, MatButton],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit, OnDestroy{
  upcomingInvoices: UpcomingInvoices[] = [];
  analyticsSubscription: Subscription = new Subscription();

  constructor(
    private analyticsService: AnalyticsService,
    private matDialog: MatDialog
  ) { }

  openPaymentModal(invoice: any) {
    this.matDialog.open(PaymentModalComponent, {
      data: {
        invoice: invoice
      }
    })
  }

  ngOnInit() {
    this.analyticsSubscription = this.analyticsService.getUpcomingInvoiceMetrics().subscribe((data: any) => {
      this.upcomingInvoices = data;
    })
  }

  ngOnDestroy() {
    this.analyticsSubscription.unsubscribe();
  }

  
}
