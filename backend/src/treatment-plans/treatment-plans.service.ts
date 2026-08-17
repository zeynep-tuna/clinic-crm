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
import { CreateTreatmentPlanDto } from './dto/create-treatment-plan.dto';
import { UpdateTreatmentPlanDto } from './dto/update-treatment-plan.dto';

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

  async create(requestingUser: RequestingUser, dto: CreateTreatmentPlanDto) {
    if (requestingUser.role !== 'DOCTOR') {
      throw new ForbiddenException('Only doctors can create treatment plans');
    }

    const currentDoctor = await this.resolveCurrentDoctor(
      requestingUser.userId,
      requestingUser.clinicId,
    );

    await this.validatePatient(dto.patientId, requestingUser.clinicId);

    const description = this.validateDescription(dto.description);
    const priority = this.validatePriority(dto.priority);
    const status = this.validateStatus(dto.status);
    const startDate = this.validateStartDate(dto.startDate);

    return this.prisma.treatmentPlan.create({
      data: {
        clinicId: requestingUser.clinicId,
        patientId: dto.patientId,
        doctorId: currentDoctor.id,
        description,
        startDate,
        ...(priority !== undefined ? { priority } : {}),
        ...(status !== undefined ? { status } : {}),
      },
      include: { patient: true, doctor: true },
    });
  }

  async update(
    id: string,
    requestingUser: RequestingUser,
    dto: UpdateTreatmentPlanDto,
  ) {
    if (requestingUser.role !== 'DOCTOR') {
      throw new ForbiddenException('Only doctors can update treatment plans');
    }

    await this.findOne(id, requestingUser);

    if (dto.patientId !== undefined) {
      await this.validatePatient(dto.patientId, requestingUser.clinicId);
    }

    const description =
      dto.description !== undefined
        ? this.validateDescription(dto.description)
        : undefined;
    const priority = this.validatePriority(dto.priority);
    const status = this.validateStatus(dto.status);
    const startDate =
      dto.startDate !== undefined
        ? this.validateStartDate(dto.startDate)
        : undefined;
    const isActive = this.validateIsActive(dto.isActive);

    return this.prisma.treatmentPlan.update({
      where: { id },
      data: {
        ...(dto.patientId !== undefined ? { patientId: dto.patientId } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(priority !== undefined ? { priority } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(startDate !== undefined ? { startDate } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
      },
      include: { patient: true, doctor: true },
    });
  }

  private async validatePatient(patientId: string, userClinicId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: patientId, clinicId: userClinicId, isActive: true },
    });

    if (!patient) {
      throw new BadRequestException('Invalid patient');
    }
  }

  private validateDescription(description: string): string {
    if (typeof description !== 'string' || !description.trim()) {
      throw new BadRequestException('Invalid description');
    }

    return description.trim();
  }

  private validatePriority(
    priority?: string,
  ): TreatmentPlanPriorityValue | undefined {
    if (priority === undefined) {
      return undefined;
    }

    if (!isTreatmentPlanPriority(priority)) {
      throw new BadRequestException('Invalid treatment plan priority');
    }

    return priority;
  }

  private validateStatus(
    status?: string,
  ): TreatmentPlanStatusValue | undefined {
    if (status === undefined) {
      return undefined;
    }

    if (!isTreatmentPlanStatus(status)) {
      throw new BadRequestException('Invalid treatment plan status');
    }

    return status;
  }

  private validateStartDate(startDate: string): Date {
    if (typeof startDate !== 'string' || !startDate.trim()) {
      throw new BadRequestException('Invalid start date');
    }

    const date = new Date(startDate);

    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Invalid start date');
    }

    return date;
  }

  private validateIsActive(isActive?: boolean): boolean | undefined {
    if (isActive === undefined) {
      return undefined;
    }

    if (typeof isActive !== 'boolean') {
      throw new BadRequestException('Invalid isActive');
    }

    return isActive;
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
