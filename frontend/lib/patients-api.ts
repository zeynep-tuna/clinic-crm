import { apiFetch } from "@/lib/api";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string | null;
  phone: string | null;
  email: string | null;
  birthDate: string | null;
  gender: string | null;
  address: string | null;
  notes: string | null;
  isActive: boolean;
  clinicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientInput {
  firstName: string;
  lastName: string;
  nationalId?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  notes?: string;
}

export interface UpdatePatientInput {
  firstName?: string;
  lastName?: string;
  nationalId?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  notes?: string;
  isActive?: boolean;
}

export interface ListPatientsOptions {
  search?: string;
  includeInactive?: boolean;
}

export function listPatients(
  options: ListPatientsOptions = {}
): Promise<Patient[]> {
  const params = new URLSearchParams();

  if (options.search !== undefined) {
    params.set("search", options.search);
  }
  if (options.includeInactive !== undefined) {
    params.set("includeInactive", String(options.includeInactive));
  }

  const query = params.toString();
  return apiFetch<Patient[]>(`/patients${query ? `?${query}` : ""}`);
}

export function getPatient(id: string): Promise<Patient> {
  return apiFetch<Patient>(`/patients/${id}`);
}

export function createPatient(input: CreatePatientInput): Promise<Patient> {
  return apiFetch<Patient>("/patients", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updatePatient(
  id: string,
  input: UpdatePatientInput
): Promise<Patient> {
  return apiFetch<Patient>(`/patients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deletePatient(id: string): Promise<Patient> {
  return apiFetch<Patient>(`/patients/${id}`, {
    method: "DELETE",
  });
}
