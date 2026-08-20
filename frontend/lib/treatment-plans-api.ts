import { apiFetch } from "@/lib/api";
import type { Patient } from "@/lib/patients-api";
import type { Doctor } from "@/lib/doctors-api";

export type TreatmentPlanStatus = "ACTIVE" | "COMPLETED" | "REVIEW_PENDING" | "POSTPONED";
export type TreatmentPlanPriority = "HIGH" | "NORMAL" | "LOW";

export interface TreatmentPlanBase {
  id: string;
  clinicId: string;
  patientId: string;
  doctorId: string;
  description: string;
  priority: TreatmentPlanPriority;
  status: TreatmentPlanStatus;
  startDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TreatmentPlan extends TreatmentPlanBase {
  patient: Patient;
  doctor: Doctor;
}

export interface CreateTreatmentPlanInput {
  patientId: string;
  description: string;
  priority?: TreatmentPlanPriority;
  status?: TreatmentPlanStatus;
  startDate: string;
}

export interface UpdateTreatmentPlanInput {
  patientId?: string;
  description?: string;
  priority?: TreatmentPlanPriority;
  status?: TreatmentPlanStatus;
  startDate?: string;
  isActive?: boolean;
}

export interface ListTreatmentPlansOptions {
  includeInactive?: boolean;
  patientId?: string;
  status?: TreatmentPlanStatus;
  priority?: TreatmentPlanPriority;
}

export function listTreatmentPlans(
  options: ListTreatmentPlansOptions = {}
): Promise<TreatmentPlan[]> {
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
  if (options.priority !== undefined) {
    params.set("priority", options.priority);
  }

  const query = params.toString();
  return apiFetch<TreatmentPlan[]>(`/treatment-plans${query ? `?${query}` : ""}`);
}

export function getTreatmentPlan(id: string): Promise<TreatmentPlan> {
  return apiFetch<TreatmentPlan>(`/treatment-plans/${id}`);
}

export function createTreatmentPlan(
  input: CreateTreatmentPlanInput
): Promise<TreatmentPlan> {
  return apiFetch<TreatmentPlan>("/treatment-plans", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateTreatmentPlan(
  id: string,
  input: UpdateTreatmentPlanInput
): Promise<TreatmentPlan> {
  return apiFetch<TreatmentPlan>(`/treatment-plans/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteTreatmentPlan(id: string): Promise<TreatmentPlan> {
  return apiFetch<TreatmentPlan>(`/treatment-plans/${id}`, {
    method: "DELETE",
  });
}
