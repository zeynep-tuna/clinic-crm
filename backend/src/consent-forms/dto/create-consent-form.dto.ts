import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  CONSENT_FORM_STATUSES,
  type ConsentFormStatusValue,
} from '../types/consent-form-status.type';

export class CreateConsentFormDto {
  @IsUUID()
  patientId: string;

  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  @MaxLength(100)
  formType: string;

  @IsString()
  @MaxLength(20000)
  content: string;

  @IsOptional()
  @IsIn(CONSENT_FORM_STATUSES)
  status?: ConsentFormStatusValue;

  @IsOptional()
  @IsDateString()
  signedAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;
}
