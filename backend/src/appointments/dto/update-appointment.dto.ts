import type { AppointmentStatusValue } from './create-appointment.dto';

export class UpdateAppointmentDto {
  patientId?: string;
  doctorId?: string;
  title?: string;
  reason?: string;
  startAt?: string;
  endAt?: string;
  status?: AppointmentStatusValue;
  notes?: string;
  isActive?: boolean;
}
