import type { TreatmentPlanPriorityValue } from '../types/treatment-plan-priority.type';
import type { TreatmentPlanStatusValue } from '../types/treatment-plan-status.type';

export class CreateTreatmentPlanDto {
  patientId: string;
  description: string;
  priority?: TreatmentPlanPriorityValue;
  status?: TreatmentPlanStatusValue;
  startDate: string;
}
