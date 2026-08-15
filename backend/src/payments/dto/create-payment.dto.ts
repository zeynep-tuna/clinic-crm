import type { PaymentMethodValue } from '../types/payment-method.type';

export class CreatePaymentDto {
  patientId: string;
  appointmentId?: string;
  amount: number;
  paymentMethod: PaymentMethodValue;
  paymentDate?: string;
  note?: string;
}
