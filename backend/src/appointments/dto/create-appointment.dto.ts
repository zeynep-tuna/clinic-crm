export const APPOINTMENT_STATUSES = [
  'SCHEDULED',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
] as const;

export type AppointmentStatusValue = (typeof APPOINTMENT_STATUSES)[number];

export class CreateAppointmentDto {
  patientId: string;
  doctorId: string;
  title?: string;
  reason?: string;
  startAt: string;
  endAt: string;
  status?: AppointmentStatusValue;
  notes?: string;
}
