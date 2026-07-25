import type { ComponentType } from "react";
import {
  PatientIcon,
  AppointmentIcon,
  DoctorPanelIcon,
  PaymentIcon,
  ConsentFormIcon,
  ReportingIcon,
} from "@/components/features/FeatureIcons";

export type FeatureItem = {
  title: string;
  description: string;
  Icon: ComponentType;
};

export const featuresData: FeatureItem[] = [
  {
    title: "Hasta Takibi",
    description: "Hasta bilgilerini, geçmiş kayıtları ve klinik notlarını tek panelden yönetin.",
    Icon: PatientIcon,
  },
  {
    title: "Randevu Yönetimi",
    description: "Randevuları planlayın, hatırlatmaları takip edin ve takvimi kolayca yönetin.",
    Icon: AppointmentIcon,
  },
  {
    title: "Doktor Paneli",
    description: "Doktorların hasta, randevu ve çalışma takvimlerini kolayca görüntüleyin.",
    Icon: DoctorPanelIcon,
  },
  {
    title: "Ödeme Takibi",
    description: "Bekleyen, tamamlanan ve kısmi ödemeleri düzenli şekilde takip edin.",
    Icon: PaymentIcon,
  },
  {
    title: "Dijital Onam Formları",
    description: "Hasta onam formlarını dijital olarak saklayın ve süreçleri düzenleyin.",
    Icon: ConsentFormIcon,
  },
  {
    title: "Raporlama",
    description: "Klinik performansını grafikler ve özet verilerle daha net analiz edin.",
    Icon: ReportingIcon,
  },
];
