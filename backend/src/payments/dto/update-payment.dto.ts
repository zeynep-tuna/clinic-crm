import type { PaymentMethodValue } from '../types/payment-method.type';

export class UpdatePaymentDto {
  patientId?: string;
  appointmentId?: string;
  amount?: number;
  paymentMethod?: PaymentMethodValue;
  paymentDate?: string;
  note?: string;
  isActive?: boolean;
}
