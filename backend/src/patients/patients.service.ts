import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import type { UserRole } from '../auth/types/role.type';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

export interface RequestingUser {
  userId: string;
  clinicId: string;
  role: UserRole;
}

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    requestingUser: RequestingUser,
    search?: string,
    includeInactive?: boolean,
  ) {
    const where: Prisma.PatientWhereInput = {
      clinicId: requestingUser.clinicId,
      ...(includeInactive ? {} : { isActive: true }),
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { nationalId: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (requestingUser.role === 'DOCTOR') {
      const currentDoctor = await this.resolveCurrentDoctor(
        requestingUser.userId,
        requestingUser.clinicId,
      );
      const relatedPatientIds = await this.resolveRelatedPatientIds(
        currentDoctor.id,
        requestingUser.clinicId,
      );
      where.id = { in: relatedPatientIds };
    }

    return this.prisma.patient.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, requestingUser: RequestingUser) {
    if (requestingUser.role === 'DOCTOR') {
      const currentDoctor = await this.resolveCurrentDoctor(
        requestingUser.userId,
        requestingUser.clinicId,
      );
      const relatedPatientIds = await this.resolveRelatedPatientIds(
        currentDoctor.id,
        requestingUser.clinicId,
      );

      if (!relatedPatientIds.includes(id)) {
        throw new NotFoundException(`Patient with id ${id} not found`);
      }
    }

    const patient = await this.prisma.patient.findFirst({
      where: { id, clinicId: requestingUser.clinicId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }

    return patient;
  }

  create(userClinicId: string, createPatientDto: CreatePatientDto) {
    const { firstName, lastName, birthDate, ...rest } = createPatientDto;

    if (!firstName?.trim() || !lastName?.trim()) {
      throw new BadRequestException('firstName and lastName are required');
    }

    return this.prisma.patient.create({
      data: {
        ...rest,
        firstName,
        lastName,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        clinicId: userClinicId,
      },
    });
  }

  async update(
    id: string,
    userClinicId: string,
    updatePatientDto: UpdatePatientDto,
  ) {
    await this.findOne(id, {
      userId: '',
      clinicId: userClinicId,
      role: 'ADMIN',
    });

    const { birthDate, ...rest } = updatePatientDto;

    return this.prisma.patient.update({
      where: { id },
      data: {
        ...rest,
        birthDate: birthDate ? new Date(birthDate) : undefined,
      },
    });
  }

  async softDelete(id: string, userClinicId: string) {
    await this.findOne(id, {
      userId: '',
      clinicId: userClinicId,
      role: 'ADMIN',
    });

    return this.prisma.patient.update({
      where: { id },
      data: { isActive: false },
    });
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
