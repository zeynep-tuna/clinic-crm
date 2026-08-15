import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import {
  CONSENT_FORM_STATUSES,
  type ConsentFormStatusValue,
} from './types/consent-form-status.type';
import { CreateConsentFormDto } from './dto/create-consent-form.dto';

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

  findAll(userClinicId: string, filters: ConsentFormFilters = {}) {
    const { includeInactive, patientId, status } = filters;

    if (status !== undefined && !isConsentFormStatus(status)) {
      throw new BadRequestException('Invalid consent form status');
    }

    const where: Prisma.ConsentFormWhereInput = {
      clinicId: userClinicId,
      ...(includeInactive ? {} : { isActive: true }),
      ...(patientId ? { patientId } : {}),
      ...(status ? { status } : {}),
    };

    return this.prisma.consentForm.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { patient: true },
    });
  }

  async findOne(id: string, userClinicId: string) {
    const consentForm = await this.prisma.consentForm.findFirst({
      where: { id, clinicId: userClinicId },
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
}
