import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userClinicId: string, search?: string, includeInactive?: boolean) {
    const where: Prisma.DoctorWhereInput = {
      clinicId: userClinicId,
      ...(includeInactive ? {} : { isActive: true }),
    };

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { specialty: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { licenseNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.doctor.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userClinicId: string) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { id, clinicId: userClinicId },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }

    return doctor;
  }

  async create(userClinicId: string, createDoctorDto: CreateDoctorDto) {
    const { fullName, userId, ...rest } = createDoctorDto;

    if (!fullName?.trim()) {
      throw new BadRequestException('fullName is required');
    }

    await this.validateDoctorUser(userId, userClinicId);

    return this.prisma.doctor.create({
      data: {
        ...rest,
        fullName,
        userId,
        clinicId: userClinicId,
      },
    });
  }

  async update(
    id: string,
    userClinicId: string,
    updateDoctorDto: UpdateDoctorDto,
  ) {
    await this.findOne(id, userClinicId);

    const { userId, ...rest } = updateDoctorDto;

    await this.validateDoctorUser(userId, userClinicId);

    return this.prisma.doctor.update({
      where: { id },
      data: {
        ...rest,
        ...(userId !== undefined ? { userId } : {}),
      },
    });
  }

  async softDelete(id: string, userClinicId: string) {
    await this.findOne(id, userClinicId);

    return this.prisma.doctor.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private async validateDoctorUser(
    userId: string | undefined,
    userClinicId: string,
  ) {
    if (!userId) {
      return;
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.clinicId !== userClinicId || user.role !== 'DOCTOR') {
      throw new BadRequestException(
        'userId must reference a DOCTOR user within the same clinic',
      );
    }
  }
}
