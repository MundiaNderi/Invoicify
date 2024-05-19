import {Component, OnInit, ViewChild} from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import {School} from "../../interfaces/school";
import {AnalyticsService} from "../../services/analytics.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";


@Component({
  standalone:true,
  imports: [NgFor, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatCell, MatHeaderRow, MatRowDef, MatHeaderRowDef, MatRow, MatPaginator, ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatButton],
  selector: 'invoice-shule',
  templateUrl: './shule.component.html',
  styleUrls: ['./shule.component.css']
})
export class ShuleComponent implements OnInit {
  schools: School[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'product', 'county', 'registrationDate', 'contact', 'balance'];
  dataSource = new MatTableDataSource<School>();
  filterForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      status: ['all'],
      product: ['all']
    });
  }

  navigateToSchoolDetails(id: number): void {
    this.router.navigate(['/schools', id]);
  }

  ngOnInit() {
    this.analyticsService.getSchoolMetrics().subscribe((data: any) => {
      this.schools = data;
      this.dataSource.data = this.schools.slice(0, 10); // Initially load only 10 entries
      this.dataSource.paginator = this.paginator;
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  applyFilter() {
    let filteredData = this.schools;

    const productFilter = this.filterForm.get('product')?.value;

    if (productFilter && productFilter !== 'all') {
      filteredData = filteredData.filter(school => school.product === productFilter);
    }

    this.dataSource.data = filteredData.slice(0, 10); // Ensure only 10 entries are shown initially
  }
}

