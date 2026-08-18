import { apiFetch } from "@/lib/api";

export interface Doctor {
  id: string;
  fullName: string;
  specialty: string | null;
  phone: string | null;
  email: string | null;
  licenseNumber: string | null;
  room: string | null;
  color: string | null;
  bio: string | null;
  isActive: boolean;
  clinicId: string;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDoctorInput {
  fullName: string;
  specialty?: string;
  phone?: string;
  email?: string;
  licenseNumber?: string;
  room?: string;
  color?: string;
  bio?: string;
  userId?: string;
}

export interface UpdateDoctorInput {
  fullName?: string;
  specialty?: string;
  phone?: string;
  email?: string;
  licenseNumber?: string;
  room?: string;
  color?: string;
  bio?: string;
  userId?: string;
  isActive?: boolean;
}

export interface ListDoctorsOptions {
  search?: string;
  includeInactive?: boolean;
}

export function listDoctors(
  options: ListDoctorsOptions = {}
): Promise<Doctor[]> {
  const params = new URLSearchParams();

  if (options.search !== undefined) {
    params.set("search", options.search);
  }
  if (options.includeInactive !== undefined) {
    params.set("includeInactive", String(options.includeInactive));
  }

  const query = params.toString();
  return apiFetch<Doctor[]>(`/doctors${query ? `?${query}` : ""}`);
}

export function getDoctor(id: string): Promise<Doctor> {
  return apiFetch<Doctor>(`/doctors/${id}`);
}

export function createDoctor(input: CreateDoctorInput): Promise<Doctor> {
  return apiFetch<Doctor>("/doctors", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateDoctor(
  id: string,
  input: UpdateDoctorInput
): Promise<Doctor> {
  return apiFetch<Doctor>(`/doctors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteDoctor(id: string): Promise<Doctor> {
  return apiFetch<Doctor>(`/doctors/${id}`, {
    method: "DELETE",
  });
}
