import { Component } from '@angular/core';
import { ShuleComponent } from './shule/shule.component';
import { ShuleInvoicesComponent } from './shule-invoices/shule-invoices.component';
import { CollectionsComponent } from './collections/collections.component';

@Component({
  selector: 'invoice-schools',
  standalone: true,
  imports: [ShuleComponent, ShuleInvoicesComponent, CollectionsComponent],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.css'
})
export class SchoolsComponent {

}
