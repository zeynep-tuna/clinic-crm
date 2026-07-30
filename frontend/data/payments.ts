export type PaymentStatus = "Ödendi" | "Bekliyor" | "Kısmi Ödeme" | "İade";

export interface Payment {
  id: string;
  patientName: string;
  treatment: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  date: string;
}

export const payments: Payment[] = [
  {
    id: "1",
    patientName: "Ayşe Demir",
    treatment: "Diş Temizliği",
    amount: 1250,
    status: "Ödendi",
    method: "Kredi Kartı",
    date: "15.05.2024",
  },
  {
    id: "2",
    patientName: "Mehmet Kaya",
    treatment: "Ortodonti Muayenesi",
    amount: 2500,
    status: "Bekliyor",
    method: "Nakit",
    date: "14.05.2024",
  },
  {
    id: "3",
    patientName: "Zeynep Aydın",
    treatment: "Kanal Tedavisi",
    amount: 850,
    status: "Kısmi Ödeme",
    method: "Havale/EFT",
    date: "13.05.2024",
  },
  {
    id: "4",
    patientName: "Ali Yıldız",
    treatment: "İmplant Kontrolü",
    amount: 3200,
    status: "Ödendi",
    method: "Kredi Kartı",
    date: "12.05.2024",
  },
  {
    id: "5",
    patientName: "Fatma Öz",
    treatment: "Diş Beyazlatma",
    amount: 1100,
    status: "İade",
    method: "Kredi Kartı",
    date: "11.05.2024",
  },
  {
    id: "6",
    patientName: "Elif Arslan",
    treatment: "Diş Kontrolü",
    amount: 750,
    status: "Bekliyor",
    method: "Nakit",
    date: "10.05.2024",
  },
];

export interface PaymentOverview {
  totalRevenue: number;
  pendingAmount: number;
  completedAmount: number;
  refundedAmount: number;
}

export const paymentOverview: PaymentOverview = {
  totalRevenue: 186450,
  pendingAmount: 24680,
  completedAmount: 126450,
  refundedAmount: 35320,
};
