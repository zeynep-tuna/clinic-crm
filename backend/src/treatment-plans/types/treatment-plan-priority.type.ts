export const TREATMENT_PLAN_PRIORITIES = ['HIGH', 'NORMAL', 'LOW'] as const;

export type TreatmentPlanPriorityValue =
  (typeof TREATMENT_PLAN_PRIORITIES)[number];
