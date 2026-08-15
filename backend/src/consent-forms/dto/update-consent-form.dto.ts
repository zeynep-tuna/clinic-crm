import type { ConsentFormStatusValue } from '../types/consent-form-status.type';

export class UpdateConsentFormDto {
  patientId?: string;
  title?: string;
  formType?: string;
  content?: string;
  status?: ConsentFormStatusValue;
  signedAt?: string;
  note?: string;
  isActive?: boolean;
}
