import { apiFetch } from "@/lib/api";
import type { Patient } from "@/lib/patients-api";
import type { Doctor } from "@/lib/doctors-api";

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface AppointmentBase {
  id: string;
  title: string | null;
  reason: string | null;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  notes: string | null;
  isActive: boolean;
  clinicId: string;
  patientId: string;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment extends AppointmentBase {
  patient: Patient;
  doctor: Doctor;
}

export interface CreateAppointmentInput {
  patientId: string;
  doctorId: string;
  title?: string;
  reason?: string;
  startAt: string;
  endAt: string;
  status?: AppointmentStatus;
  notes?: string;
}

export interface UpdateAppointmentInput {
  patientId?: string;
  doctorId?: string;
  title?: string;
  reason?: string;
  startAt?: string;
  endAt?: string;
  status?: AppointmentStatus;
  notes?: string;
  isActive?: boolean;
}

export interface ListAppointmentsFilters {
  dateFrom?: string;
  dateTo?: string;
  doctorId?: string;
  patientId?: string;
  status?: AppointmentStatus;
  includeInactive?: boolean;
}

export function listAppointments(
  filters: ListAppointmentsFilters = {}
): Promise<Appointment[]> {
  const params = new URLSearchParams();

  if (filters.dateFrom !== undefined) {
    params.set("dateFrom", filters.dateFrom);
  }
  if (filters.dateTo !== undefined) {
    params.set("dateTo", filters.dateTo);
  }
  if (filters.doctorId !== undefined) {
    params.set("doctorId", filters.doctorId);
  }
  if (filters.patientId !== undefined) {
    params.set("patientId", filters.patientId);
  }
  if (filters.status !== undefined) {
    params.set("status", filters.status);
  }
  if (filters.includeInactive !== undefined) {
    params.set("includeInactive", String(filters.includeInactive));
  }

  const query = params.toString();
  return apiFetch<Appointment[]>(`/appointments${query ? `?${query}` : ""}`);
}

export function getAppointment(id: string): Promise<Appointment> {
  return apiFetch<Appointment>(`/appointments/${id}`);
}

export function createAppointment(
  input: CreateAppointmentInput
): Promise<Appointment> {
  return apiFetch<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateAppointment(
  id: string,
  input: UpdateAppointmentInput
): Promise<Appointment> {
  return apiFetch<Appointment>(`/appointments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteAppointment(id: string): Promise<AppointmentBase> {
  return apiFetch<AppointmentBase>(`/appointments/${id}`, {
    method: "DELETE",
  });
}
