import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  PAYMENT_METHODS,
  type PaymentMethodValue,
} from '../types/payment-method.type';

export class CreatePaymentDto {
  @IsUUID()
  patientId: string;

  @IsOptional()
  @IsUUID()
  appointmentId?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsIn(PAYMENT_METHODS)
  paymentMethod: PaymentMethodValue;

  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;
}
