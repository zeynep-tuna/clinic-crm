import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import {
  CONSENT_FORM_STATUSES,
  type ConsentFormStatusValue,
} from './types/consent-form-status.type';

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
}
