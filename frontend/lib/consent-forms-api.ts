import { apiFetch } from "@/lib/api";
import type { Patient } from "@/lib/patients-api";

export type ConsentFormStatus = "SIGNED" | "PENDING" | "MISSING";

export interface ConsentFormBase {
  id: string;
  clinicId: string;
  patientId: string;
  title: string;
  formType: string;
  content: string;
  status: ConsentFormStatus;
  signedAt: string | null;
  note: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConsentForm extends ConsentFormBase {
  patient: Patient;
}

export interface CreateConsentFormInput {
  patientId: string;
  title: string;
  formType: string;
  content: string;
  status?: ConsentFormStatus;
  signedAt?: string;
  note?: string;
}

export interface UpdateConsentFormInput {
  patientId?: string;
  title?: string;
  formType?: string;
  content?: string;
  status?: ConsentFormStatus;
  signedAt?: string;
  note?: string;
  isActive?: boolean;
}

export interface ListConsentFormsOptions {
  includeInactive?: boolean;
  patientId?: string;
  status?: ConsentFormStatus;
}

export function listConsentForms(
  options: ListConsentFormsOptions = {}
): Promise<ConsentForm[]> {
  const params = new URLSearchParams();

  if (options.includeInactive !== undefined) {
    params.set("includeInactive", String(options.includeInactive));
  }
  if (options.patientId !== undefined) {
    params.set("patientId", options.patientId);
  }
  if (options.status !== undefined) {
    params.set("status", options.status);
  }

  const query = params.toString();
  return apiFetch<ConsentForm[]>(`/consent-forms${query ? `?${query}` : ""}`);
}

export function getConsentForm(id: string): Promise<ConsentForm> {
  return apiFetch<ConsentForm>(`/consent-forms/${id}`);
}

export function createConsentForm(
  input: CreateConsentFormInput
): Promise<ConsentForm> {
  return apiFetch<ConsentForm>("/consent-forms", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateConsentForm(
  id: string,
  input: UpdateConsentFormInput
): Promise<ConsentForm> {
  return apiFetch<ConsentForm>(`/consent-forms/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteConsentForm(id: string): Promise<ConsentForm> {
  return apiFetch<ConsentForm>(`/consent-forms/${id}`, {
    method: "DELETE",
  });
}
