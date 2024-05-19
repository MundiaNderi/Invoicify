import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { Invoice } from '../../interfaces/invoices';
import { AnalyticsService } from '../../services/analytics.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {InvoiceModalComponent} from "./invoice-modal/invoice-modal.component";
import {CollectionModalComponent} from "./collection-modal/collection-modal.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  standalone: true,
  selector: 'app-shule-upcoming-invoices',
  imports: [NgFor, ReactiveFormsModule, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatCell, MatButton, MatHeaderRow, MatPaginator, MatRow, MatHeaderRowDef, MatRowDef],
  templateUrl: './shule-invoices.component.html',
  styleUrls: ['./shule-invoices.component.css'],
  providers: [DatePipe]
})
export class ShuleInvoicesComponent implements OnInit, OnDestroy {
  invoices: Invoice[] = [];
  invoiceSubscription: Subscription = new Subscription();
  filterForm: FormGroup;
  dataSource = new MatTableDataSource<Invoice>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private datePipe: DatePipe,
    private analyticsService: AnalyticsService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      status: ['all']
    });
  }

  formatDate(date: any): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return this.datePipe.transform(date, 'dd.MM.yyyy') || '';
  }

  calculateDaysUntilDue(dueDate: string): number {
    const dueDateObj = new Date(dueDate);
    const currentDate = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((dueDateObj.getTime() - currentDate.getTime()) / millisecondsPerDay);
  }

  ngOnInit(): void {
    this.invoiceSubscription = this.analyticsService.getInvoiceMetrics().subscribe((data: any) => {
      this.invoices = data;
      this.dataSource.data = data;
      this.applyFilter();
      this.dataSource.paginator = this.paginator;
    });

    this.filterForm.get('status')?.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    this.invoiceSubscription.unsubscribe();
  }

  applyFilter(): void {
    const status = this.filterForm.get('status')?.value;
    if (status === 'completed') {
      this.dataSource.data = this.invoices.filter(invoice => invoice.status === 'Completed');
    } else if (status === 'pending') {
      this.dataSource.data = this.invoices.filter(invoice => invoice.status !== 'Completed');
    } else {
      this.dataSource.data = this.invoices;
    }
    this.dataSource.paginator = this.paginator; // Ensure paginator is set after data change
  }

  openInvoiceModal(invoice: Invoice | null = null): void {
    const dialogRef = this.dialog.open(InvoiceModalComponent, {
      width: '400px',
      data: { invoice }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (invoice) {
          Object.assign(invoice, result);
        } else {
          this.invoices.push(result);
        }
        this.applyFilter();
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openCollectionModal(invoice: Invoice): void {
    const dialogRef = this.dialog.open(CollectionModalComponent, {
      width: '400px',
      data: { invoice }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        invoice.paidAmount += result.amount;
        invoice.status = invoice.paidAmount >= invoice.amount ? 'Completed' : 'Pending';
        this.applyFilter();
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
