import type { ConsentFormStatusValue } from '../types/consent-form-status.type';

export class CreateConsentFormDto {
  patientId: string;
  title: string;
  formType: string;
  content: string;
  status?: ConsentFormStatusValue;
  signedAt?: string;
  note?: string;
}
