import { apiFetch } from "@/lib/api";
import type { Patient } from "@/lib/patients-api";
import type { Appointment } from "@/lib/appointments-api";

export type PaymentMethod = "CASH" | "CARD" | "BANK_TRANSFER";

export interface PaymentBase {
  id: string;
  amount: string;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  note: string | null;
  isActive: boolean;
  clinicId: string;
  patientId: string;
  appointmentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Payment extends PaymentBase {
  patient: Patient;
  appointment: Appointment | null;
}

export interface CreatePaymentInput {
  patientId: string;
  appointmentId?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate?: string;
  note?: string;
}

export interface UpdatePaymentInput {
  patientId?: string;
  appointmentId?: string;
  amount?: number;
  paymentMethod?: PaymentMethod;
  paymentDate?: string;
  note?: string;
  isActive?: boolean;
}

export interface ListPaymentsOptions {
  includeInactive?: boolean;
}

export function listPayments(
  options: ListPaymentsOptions = {}
): Promise<Payment[]> {
  const params = new URLSearchParams();

  if (options.includeInactive !== undefined) {
    params.set("includeInactive", String(options.includeInactive));
  }

  const query = params.toString();
  return apiFetch<Payment[]>(`/payments${query ? `?${query}` : ""}`);
}

export function getPayment(id: string): Promise<Payment> {
  return apiFetch<Payment>(`/payments/${id}`);
}

export function createPayment(input: CreatePaymentInput): Promise<Payment> {
  return apiFetch<Payment>("/payments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updatePayment(
  id: string,
  input: UpdatePaymentInput
): Promise<Payment> {
  return apiFetch<Payment>(`/payments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deletePayment(id: string): Promise<PaymentBase> {
  return apiFetch<PaymentBase>(`/payments/${id}`, {
    method: "DELETE",
  });
}
