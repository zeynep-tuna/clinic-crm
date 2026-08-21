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
  CONSENT_FORM_STATUSES,
  type ConsentFormStatusValue,
} from './types/consent-form-status.type';
import { CreateConsentFormDto } from './dto/create-consent-form.dto';
import { UpdateConsentFormDto } from './dto/update-consent-form.dto';

export interface RequestingUser {
  userId: string;
  clinicId: string;
  role: UserRole;
}

export interface ConsentFormFilters {
  includeInactive?: boolean;
  patientId?: string;
  status?: string;
}

function isConsentFormStatus(value: string): value is ConsentFormStatusValue {
  return (CONSENT_FORM_STATUSES as readonly string[]).includes(value);
}

@Injectable()
export class ConsentFormsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    requestingUser: RequestingUser,
    filters: ConsentFormFilters = {},
  ) {
    const { includeInactive, patientId, status } = filters;

    if (status !== undefined && !isConsentFormStatus(status)) {
      throw new BadRequestException('Invalid consent form status');
    }

    const where: Prisma.ConsentFormWhereInput = {
      clinicId: requestingUser.clinicId,
      ...(includeInactive ? {} : { isActive: true }),
      ...(patientId ? { patientId } : {}),
      ...(status ? { status } : {}),
    };

    if (requestingUser.role === 'DOCTOR') {
      const currentDoctor = await this.resolveCurrentDoctor(
        requestingUser.userId,
        requestingUser.clinicId,
      );
      const relatedPatientIds = await this.resolveRelatedPatientIds(
        currentDoctor.id,
        requestingUser.clinicId,
      );

      where.patientId = patientId
        ? { in: relatedPatientIds.includes(patientId) ? [patientId] : [] }
        : { in: relatedPatientIds };
    }

    return this.prisma.consentForm.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { patient: true },
    });
  }

  async findOne(id: string, requestingUser: RequestingUser) {
    const where: Prisma.ConsentFormWhereInput = {
      id,
      clinicId: requestingUser.clinicId,
    };

    if (requestingUser.role === 'DOCTOR') {
      const currentDoctor = await this.resolveCurrentDoctor(
        requestingUser.userId,
        requestingUser.clinicId,
      );
      const relatedPatientIds = await this.resolveRelatedPatientIds(
        currentDoctor.id,
        requestingUser.clinicId,
      );
      where.patientId = { in: relatedPatientIds };
    }

    const consentForm = await this.prisma.consentForm.findFirst({
      where,
      include: { patient: true },
    });

    if (!consentForm) {
      throw new NotFoundException(`Consent form with id ${id} not found`);
    }

    return consentForm;
  }

  async create(userClinicId: string, dto: CreateConsentFormDto) {
    await this.validatePatient(dto.patientId, userClinicId);

    const title = this.validateTitle(dto.title);
    const formType = this.validateFormType(dto.formType);
    const content = this.validateContent(dto.content);
    const status = this.validateStatus(dto.status);
    const signedAt = this.validateSignedAt(dto.signedAt);
    const note = this.validateNote(dto.note);

    return this.prisma.consentForm.create({
      data: {
        clinicId: userClinicId,
        patientId: dto.patientId,
        title,
        formType,
        content,
        ...(status !== undefined ? { status } : {}),
        ...(signedAt !== undefined ? { signedAt } : {}),
        ...(note !== undefined ? { note } : {}),
      },
      include: { patient: true },
    });
  }

  async update(id: string, userClinicId: string, dto: UpdateConsentFormDto) {
    await this.findOne(id, {
      userId: '',
      clinicId: userClinicId,
      role: 'ADMIN',
    });

    if (dto.patientId !== undefined) {
      await this.validatePatient(dto.patientId, userClinicId);
    }

    const title =
      dto.title !== undefined ? this.validateTitle(dto.title) : undefined;
    const formType =
      dto.formType !== undefined
        ? this.validateFormType(dto.formType)
        : undefined;
    const content =
      dto.content !== undefined
        ? this.validateContent(dto.content)
        : undefined;
    const status = this.validateStatus(dto.status);
    const signedAt = this.validateSignedAt(dto.signedAt);
    const note = this.validateNote(dto.note);
    const isActive = this.validateIsActive(dto.isActive);

    return this.prisma.consentForm.update({
      where: { id },
      data: {
        ...(dto.patientId !== undefined ? { patientId: dto.patientId } : {}),
        ...(title !== undefined ? { title } : {}),
        ...(formType !== undefined ? { formType } : {}),
        ...(content !== undefined ? { content } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(signedAt !== undefined ? { signedAt } : {}),
        ...(note !== undefined ? { note } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
      },
      include: { patient: true },
    });
  }

  async softDelete(id: string, userClinicId: string) {
    await this.findOne(id, {
      userId: '',
      clinicId: userClinicId,
      role: 'ADMIN',
    });

    return this.prisma.consentForm.update({
      where: { id },
      data: { isActive: false },
      include: { patient: true },
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

  private validateTitle(title: string): string {
    if (typeof title !== 'string' || !title.trim()) {
      throw new BadRequestException('Invalid title');
    }

    return title.trim();
  }

  private validateFormType(formType: string): string {
    if (typeof formType !== 'string' || !formType.trim()) {
      throw new BadRequestException('Invalid form type');
    }

    return formType.trim();
  }

  private validateContent(content: string): string {
    if (typeof content !== 'string' || !content.trim()) {
      throw new BadRequestException('Invalid content');
    }

    return content.trim();
  }

  private validateStatus(
    status?: string,
  ): ConsentFormStatusValue | undefined {
    if (status === undefined) {
      return undefined;
    }

    if (!isConsentFormStatus(status)) {
      throw new BadRequestException('Invalid consent form status');
    }

    return status;
  }

  private validateSignedAt(signedAt?: string): Date | undefined {
    if (signedAt === undefined) {
      return undefined;
    }

    const date = new Date(signedAt);

    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Invalid signed date');
    }

    return date;
  }

  private validateNote(note?: string): string | undefined {
    if (note === undefined) {
      return undefined;
    }

    if (typeof note !== 'string') {
      throw new BadRequestException('Invalid note');
    }

    return note;
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

  private async resolveRelatedPatientIds(
    doctorId: string,
    clinicId: string,
  ): Promise<string[]> {
    const [appointmentPatients, treatmentPlanPatients] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { doctorId, clinicId },
        select: { patientId: true },
        distinct: ['patientId'],
      }),
      this.prisma.treatmentPlan.findMany({
        where: { doctorId, clinicId },
        select: { patientId: true },
        distinct: ['patientId'],
      }),
    ]);

    const patientIds = new Set<string>();
    for (const row of appointmentPatients) {
      patientIds.add(row.patientId);
    }
    for (const row of treatmentPlanPatients) {
      patientIds.add(row.patientId);
    }

    return Array.from(patientIds);
  }
}
