import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userClinicId: string, search?: string, includeInactive?: boolean) {
    const where: Prisma.PatientWhereInput = {
      clinicId: userClinicId,
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

    return this.prisma.patient.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userClinicId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id, clinicId: userClinicId },
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
    await this.findOne(id, userClinicId);

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
    await this.findOne(id, userClinicId);

    return this.prisma.patient.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
