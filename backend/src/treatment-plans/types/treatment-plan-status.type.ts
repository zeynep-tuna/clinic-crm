export const TREATMENT_PLAN_STATUSES = [
  'ACTIVE',
  'COMPLETED',
  'REVIEW_PENDING',
  'POSTPONED',
] as const;

export type TreatmentPlanStatusValue =
  (typeof TREATMENT_PLAN_STATUSES)[number];
