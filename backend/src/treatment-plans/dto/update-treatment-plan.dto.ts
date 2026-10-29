import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  TREATMENT_PLAN_PRIORITIES,
  type TreatmentPlanPriorityValue,
} from '../types/treatment-plan-priority.type';
import {
  TREATMENT_PLAN_STATUSES,
  type TreatmentPlanStatusValue,
} from '../types/treatment-plan-status.type';

export class UpdateTreatmentPlanDto {
  @IsOptional()
  @IsUUID()
  patientId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsIn(TREATMENT_PLAN_PRIORITIES)
  priority?: TreatmentPlanPriorityValue;

  @IsOptional()
  @IsIn(TREATMENT_PLAN_STATUSES)
  status?: TreatmentPlanStatusValue;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
