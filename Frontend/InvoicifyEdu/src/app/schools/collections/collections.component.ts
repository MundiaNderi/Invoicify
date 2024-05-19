import {Component, OnInit, ViewChild} from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import {Invoice} from "../../interfaces/invoices";
import {AnalyticsService} from "../../services/analytics.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'invoice-collections',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatButton, MatHeaderRowDef, MatRowDef, MatHeaderRow, MatRow, MatPaginator],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
  providers: [DatePipe]
})
export class CollectionsComponent implements OnInit {
  collections: Invoice[] = [];
  displayedColumns: string[] = ['invoiceNumber', 'collectionNumber', 'collectionDate', 'status', 'amount', 'actions'];
  dataSource = new MatTableDataSource<Invoice>();
  filterForm: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private analyticsService: AnalyticsService,
    private fb: FormBuilder
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

  ngOnInit(): void {
    this.analyticsService.getInvoiceMetrics().subscribe((data: any) => {
      this.collections = data;
      this.dataSource.data = this.collections;
      this.dataSource.paginator = this.paginator;
      this.applyFilter();
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  applyFilter() {
    const statusFilter = this.filterForm.get('status')?.value;
    this.dataSource.filter = statusFilter === 'all' ? '' : statusFilter;
  }

  markCollectionStatus(collection: any, newStatus: string): void {
    collection.status = newStatus;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

}
