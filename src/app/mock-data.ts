// schools-data.ts

export interface Invoice {
  id: number;
  amount: number;
  due_date: string;
  status: string;
}

export interface Collection {
  id: number;
  amount: number;
  date: string;
}

export interface School {
  id: number;
  name: string;
  type: string;
  product: string;
  county: string;
  registration_date: string;
  contact_information: string;
  invoices: Invoice[];
  collections: Collection[];
}

export const dummyData: School[] = [
  {
    id: 1,
    name: "Example Primary School",
    type: "Primary",
    product: "ABC Curriculum",
    county: "Example County",
    registration_date: "2022-01-01",
    contact_information: "123-456-7890",
    invoices: [
      { id: 1, amount: 500, due_date: "2024-05-20", status: "Unpaid" },
      { id: 2, amount: 750, due_date: "2024-06-15", status: "Unpaid" }
    ],
    collections: [
      { id: 1, amount: 300, date: "2024-05-17" }
    ]
  },
  {
    id: 2,
    name: "Example Secondary School",
    type: "Secondary",
    product: "XYZ Curriculum",
    county: "Another County",
    registration_date: "2023-02-15",
    contact_information: "987-654-3210",
    invoices: [
      { id: 3, amount: 1000, due_date: "2024-05-25", status: "Unpaid" }
    ],
    collections: [
      { id: 2, amount: 600, date: "2024-05-16" },
      { id: 3, amount: 400, date: "2024-05-18" }
    ]
  }
];
