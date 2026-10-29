import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { CreateRadiographDto } from './dto/create-radiograph.dto';
import {
  MAX_RADIOGRAPH_FILE_SIZE,
  buildStorageKey,
  detectImageType,
  readRadiographFile,
  saveRadiographFile,
} from './radiograph-storage';

export interface RadiographFilters {
  patientId?: string;
  includeInactive?: boolean;
}

const uploaderSelect = {
  id: true,
  fullName: true,
  role: true,
} as const;

const radiographInclude = {
  uploadedBy: { select: uploaderSelect },
  findings: {
    orderBy: { createdAt: 'asc' },
  },
} satisfies Prisma.RadiographInclude;

// The on-disk location is an internal detail; clients fetch /radiographs/:id/file.
const radiographOmit = { storageKey: true } as const;

@Injectable()
export class RadiographsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    currentUser: AuthenticatedUser,
    filters: RadiographFilters = {},
  ) {
    const { patientId, includeInactive } = filters;

    const where: Prisma.RadiographWhereInput = {
      clinicId: currentUser.clinicId,
      ...(includeInactive ? {} : { isActive: true }),
      ...(patientId ? { patientId } : {}),
    };

    if (currentUser.role === 'DOCTOR') {
      const relatedPatientIds = await this.resolveDoctorPatientIds(currentUser);
      where.patientId = patientId
        ? relatedPatientIds.includes(patientId)
          ? patientId
          : { in: [] }
        : { in: relatedPatientIds };
    }

    return this.prisma.radiograph.findMany({
      where,
      orderBy: [{ takenAt: 'desc' }, { createdAt: 'desc' }],
      include: radiographInclude,
      omit: radiographOmit,
    });
  }

  async findOne(id: string, currentUser: AuthenticatedUser) {
    await this.findAccessible(id, currentUser);

    return this.prisma.radiograph.findUniqueOrThrow({
      where: { id },
      include: radiographInclude,
      omit: radiographOmit,
    });
  }

  async getFile(id: string, currentUser: AuthenticatedUser) {
    const radiograph = await this.findAccessible(id, currentUser);
    const buffer = await readRadiographFile(radiograph.storageKey);

    return { buffer, mimeType: radiograph.mimeType };
  }

  // Applies clinic scope, plus the doctor's related-patient scope; anything
  // outside it is reported as not found rather than forbidden.
  private async findAccessible(id: string, currentUser: AuthenticatedUser) {
    const radiograph = await this.prisma.radiograph.findFirst({
      where: { id, clinicId: currentUser.clinicId },
    });

    if (!radiograph) {
      throw new NotFoundException(`Radiograph with id ${id} not found`);
    }

    if (currentUser.role === 'DOCTOR') {
      const relatedPatientIds = await this.resolveDoctorPatientIds(currentUser);

      if (!relatedPatientIds.includes(radiograph.patientId)) {
        throw new NotFoundException(`Radiograph with id ${id} not found`);
      }
    }

    return radiograph;
  }

  async create(
    currentUser: AuthenticatedUser,
    dto: CreateRadiographDto,
    file: Express.Multer.File | undefined,
  ) {
    if (!file) {
      throw new BadRequestException('file is required');
    }

    if (file.size > MAX_RADIOGRAPH_FILE_SIZE) {
      throw new BadRequestException('File is too large (max 20 MB)');
    }

    const detected = detectImageType(file.buffer);

    if (!detected) {
      throw new BadRequestException('Only PNG and JPEG images are supported');
    }

    await this.validatePatient(dto.patientId, currentUser);

    const id = randomUUID();
    const storageKey = buildStorageKey(
      currentUser.clinicId,
      id,
      detected.extension,
    );

    await saveRadiographFile(storageKey, file.buffer);

    return this.prisma.radiograph.create({
      data: {
        id,
        clinicId: currentUser.clinicId,
        patientId: dto.patientId,
        uploadedById: currentUser.id,
        type: dto.type,
        takenAt: dto.takenAt ? new Date(dto.takenAt) : undefined,
        note: dto.note?.trim() || undefined,
        storageKey,
        originalFileName: file.originalname.slice(0, 255),
        mimeType: detected.mimeType,
        fileSize: file.size,
      },
      include: radiographInclude,
      omit: radiographOmit,
    });
  }

  async softDelete(id: string, userClinicId: string) {
    const radiograph = await this.prisma.radiograph.findFirst({
      where: { id, clinicId: userClinicId },
    });

    if (!radiograph) {
      throw new NotFoundException(`Radiograph with id ${id} not found`);
    }

    return this.prisma.radiograph.update({
      where: { id },
      data: { isActive: false },
      include: radiographInclude,
      omit: radiographOmit,
    });
  }

  private async validatePatient(
    patientId: string,
    currentUser: AuthenticatedUser,
  ) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: patientId, clinicId: currentUser.clinicId, isActive: true },
    });

    if (!patient) {
      throw new BadRequestException(
        'patientId must reference an active patient within the same clinic',
      );
    }

    if (currentUser.role === 'DOCTOR') {
      const relatedPatientIds = await this.resolveDoctorPatientIds(currentUser);

      if (!relatedPatientIds.includes(patientId)) {
        throw new ForbiddenException(
          'You can only upload radiographs for your own patients',
        );
      }
    }
  }

  // Same scope rule as PatientsService: a doctor's patients are those linked
  // through the doctor's own appointments or treatment plans.
  private async resolveDoctorPatientIds(
    currentUser: AuthenticatedUser,
  ): Promise<string[]> {
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        userId: currentUser.id,
        clinicId: currentUser.clinicId,
        isActive: true,
      },
    });

    if (!doctor) {
      throw new ForbiddenException('Doctor profile not found');
    }

    const [appointmentPatients, treatmentPlanPatients] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { doctorId: doctor.id, clinicId: currentUser.clinicId },
        select: { patientId: true },
        distinct: ['patientId'],
      }),
      this.prisma.treatmentPlan.findMany({
        where: { doctorId: doctor.id, clinicId: currentUser.clinicId },
        select: { patientId: true },
        distinct: ['patientId'],
      }),
    ]);

    return Array.from(
      new Set(
        [...appointmentPatients, ...treatmentPlanPatients].map(
          (row) => row.patientId,
        ),
      ),
    );
  }
}
