import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import type { UserRole } from '../auth/types/role.type';
import {
  TREATMENT_PLAN_STATUSES,
  type TreatmentPlanStatusValue,
} from './types/treatment-plan-status.type';
import {
  TREATMENT_PLAN_PRIORITIES,
  type TreatmentPlanPriorityValue,
} from './types/treatment-plan-priority.type';

export interface RequestingUser {
  userId: string;
  clinicId: string;
  role: UserRole;
}

export interface TreatmentPlanFilters {
  includeInactive?: boolean;
  patientId?: string;
  status?: string;
  priority?: string;
}

function isTreatmentPlanStatus(
  value: string,
): value is TreatmentPlanStatusValue {
  return (TREATMENT_PLAN_STATUSES as readonly string[]).includes(value);
}

function isTreatmentPlanPriority(
  value: string,
): value is TreatmentPlanPriorityValue {
  return (TREATMENT_PLAN_PRIORITIES as readonly string[]).includes(value);
}

@Injectable()
export class TreatmentPlansService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    requestingUser: RequestingUser,
    filters: TreatmentPlanFilters = {},
  ) {
    const { includeInactive, patientId, status, priority } = filters;

    if (status !== undefined && !isTreatmentPlanStatus(status)) {
      throw new BadRequestException('Invalid treatment plan status');
    }

    if (priority !== undefined && !isTreatmentPlanPriority(priority)) {
      throw new BadRequestException('Invalid treatment plan priority');
    }

    const where: Prisma.TreatmentPlanWhereInput = {
      clinicId: requestingUser.clinicId,
      ...(includeInactive ? {} : { isActive: true }),
      ...(patientId ? { patientId } : {}),
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
    };

    if (requestingUser.role === 'DOCTOR') {
      const currentDoctor = await this.resolveCurrentDoctor(
        requestingUser.userId,
        requestingUser.clinicId,
      );
      where.doctorId = currentDoctor.id;
    }

    return this.prisma.treatmentPlan.findMany({
      where,
      orderBy: { startDate: 'desc' },
      include: { patient: true, doctor: true },
    });
  }

  async findOne(id: string, requestingUser: RequestingUser) {
    const where: Prisma.TreatmentPlanWhereInput = {
      id,
      clinicId: requestingUser.clinicId,
    };

    if (requestingUser.role === 'DOCTOR') {
      const currentDoctor = await this.resolveCurrentDoctor(
        requestingUser.userId,
        requestingUser.clinicId,
      );
      where.doctorId = currentDoctor.id;
    }

    const treatmentPlan = await this.prisma.treatmentPlan.findFirst({
      where,
      include: { patient: true, doctor: true },
    });

    if (!treatmentPlan) {
      throw new NotFoundException(`Treatment plan with id ${id} not found`);
    }

    return treatmentPlan;
  }

  private async resolveCurrentDoctor(
    authenticatedUserId: string,
    userClinicId: string,
  ) {
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        userId: authenticatedUserId,
        clinicId: userClinicId,
        isActive: true,
      },
    });

    if (!doctor) {
      throw new ForbiddenException('Doctor profile not found');
    }

    return doctor;
  }
}
