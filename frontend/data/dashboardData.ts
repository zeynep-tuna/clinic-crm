export const dashboardCards = [
  {
    id: 1,
    title: "Total Patients",
    value: 1248,
    icon: "users",
  },
  {
    id: 2,
    title: "Today's Appointments",
    value: 42,
    icon: "calendar",
  },
  {
    id: 3,
    title: "Active Doctors",
    value: 18,
    icon: "stethoscope",
  },
  {
    id: 4,
    title: "Pending Payments",
    value: 15,
    icon: "wallet",
  },
];

export const recentPatients = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    phone: "0555 123 45 67",
    registeredDate: "21 Jul 2026",
  },
  {
    id: 2,
    name: "Ayşe Demir",
    phone: "0555 234 56 78",
    registeredDate: "20 Jul 2026",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    phone: "0555 345 67 89",
    registeredDate: "20 Jul 2026",
  },
  {
    id: 4,
    name: "Fatma Arslan",
    phone: "0555 456 78 90",
    registeredDate: "19 Jul 2026",
  },
  {
    id: 5,
    name: "Ali Can",
    phone: "0555 567 89 01",
    registeredDate: "18 Jul 2026",
  },
];

export const todayAppointments = [
  {
    id: 1,
    patient: "Ahmet Yılmaz",
    doctor: "Dr. Ayşe Kaya",
    department: "Orthodontics",
    time: "09:00",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Fatma Demir",
    doctor: "Dr. Mehmet Can",
    department: "Dental Surgery",
    time: "10:30",
    status: "Waiting",
  },
  {
    id: 3,
    patient: "Ali Kara",
    doctor: "Dr. Elif Yıldız",
    department: "Endodontics",
    time: "13:00",
    status: "Confirmed",
  },
  {
    id: 4,
    patient: "Zeynep Arslan",
    doctor: "Dr. Hasan Demir",
    department: "Periodontology",
    time: "15:30",
    status: "Completed",
  },
  {
    id: 5,
    patient: "Can Özkan",
    doctor: "Dr. Selin Aydın",
    department: "Pediatric Dentistry",
    time: "16:15",
    status: "Waiting",
  },
];

export const paymentSummary = {
  paid: "₺170,000",
  pending: "₺15,000",
  overdue: "₺8,000",
};