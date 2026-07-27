export type DoctorTreatmentPlanStatus = "Aktif" | "Tamamlandı" | "Kontrol Bekliyor" | "Ertelendi";

export type DoctorTreatmentPlanPriority = "Yüksek" | "Normal" | "Düşük";

export interface DoctorTreatmentPlanSummary {
  id: string;
  title: string;
  value: string;
}

export const doctorTreatmentPlanSummary: DoctorTreatmentPlanSummary[] = [
  { id: "active", title: "Aktif Plan", value: "8" },
  { id: "completed", title: "Tamamlanan", value: "14" },
  { id: "pending-review", title: "Kontrol Bekleyen", value: "5" },
  { id: "updated-this-week", title: "Bu Hafta Güncellenen", value: "6" },
];

export interface DoctorTreatmentPlanRow {
  id: string;
  patientName: string;
  planDescription: string;
  startDate: string;
  lastUpdateLabel: string;
  priority: DoctorTreatmentPlanPriority;
  status: DoctorTreatmentPlanStatus;
}

export const doctorTreatmentPlanRows: DoctorTreatmentPlanRow[] = [
  {
    id: "1",
    patientName: "Ayşe Demir",
    planDescription: "Diş temizliği sonrası kontrol planı",
    startDate: "15.05.2024",
    lastUpdateLabel: "Bugün",
    priority: "Normal",
    status: "Aktif",
  },
  {
    id: "2",
    patientName: "Mehmet Kaya",
    planDescription: "Dolgu tedavisi ve takip süreci",
    startDate: "14.05.2024",
    lastUpdateLabel: "Dün",
    priority: "Yüksek",
    status: "Aktif",
  },
  {
    id: "3",
    patientName: "Zeynep Aydın",
    planDescription: "Periodik diş temizliği planı",
    startDate: "10.05.2024",
    lastUpdateLabel: "2 gün önce",
    priority: "Normal",
    status: "Kontrol Bekliyor",
  },
  {
    id: "4",
    patientName: "Ali Yıldız",
    planDescription: "Kontrol muayenesi ve röntgen değerlendirme",
    startDate: "08.05.2024",
    lastUpdateLabel: "1 hafta önce",
    priority: "Düşük",
    status: "Tamamlandı",
  },
  {
    id: "5",
    patientName: "Fatma Öz",
    planDescription: "Diş eti hassasiyeti takip planı",
    startDate: "05.05.2024",
    lastUpdateLabel: "3 gün önce",
    priority: "Yüksek",
    status: "Kontrol Bekliyor",
  },
  {
    id: "6",
    patientName: "Burak Demir",
    planDescription: "Tedavi planı güncelleme süreci",
    startDate: "01.05.2024",
    lastUpdateLabel: "10 gün önce",
    priority: "Normal",
    status: "Ertelendi",
  },
];
