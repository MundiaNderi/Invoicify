import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'invoice-invoice-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './invoice-modal.component.html',
  styleUrl: './invoice-modal.component.css'
})
export class InvoiceModalComponent {
  invoiceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<InvoiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.invoiceForm = this.fb.group({
      id: [data.invoice ? data.invoice.id : null],
      item: [data.invoice ? data.invoice.item : '', Validators.required],
      creationDate: [data.invoice ? data.invoice.creationDate : '', Validators.required],
      dueDate: [data.invoice ? data.invoice.dueDate : '', Validators.required],
      amount: [data.invoice ? data.invoice.amount : '', Validators.required],
      paidAmount: [data.invoice ? data.invoice.paidAmount : 0, Validators.required],
      status: [data.invoice ? data.invoice.status : 'Pending', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      this.dialogRef.close(this.invoiceForm.value);
    }
  }
}
