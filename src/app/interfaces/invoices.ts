export interface Invoice {
  id: number;
  schoolId: number;
  schoolName: string;
  invoiceNumber: string;
  item: string;
  amount: number;
  creationDate: string;
  dueDate: string;
  status: string;
  paidAmount: number;
  collectionNumber?: string;
  collectionAmount?: number;
  collectionDate?: string;
}
