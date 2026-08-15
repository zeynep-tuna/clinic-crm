export const CONSENT_FORM_STATUSES = ['SIGNED', 'PENDING', 'MISSING'] as const;

export type ConsentFormStatusValue = (typeof CONSENT_FORM_STATUSES)[number];
