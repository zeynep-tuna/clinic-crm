import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import {
  APPOINTMENT_STATUSES,
  CreateAppointmentDto,
  type AppointmentStatusValue,
} from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

export interface AppointmentFilters {
  dateFrom?: string;
  dateTo?: string;
  doctorId?: string;
  patientId?: string;
  status?: string;
  includeInactive?: boolean;
}

const NON_CONFLICTING_STATUSES: AppointmentStatusValue[] = [
  'CANCELLED',
  'NO_SHOW',
];

function isAppointmentStatus(value: string): value is AppointmentStatusValue {
  return (APPOINTMENT_STATUSES as readonly string[]).includes(value);
}

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userClinicId: string, filters: AppointmentFilters = {}) {
    const { dateFrom, dateTo, doctorId, patientId, status, includeInactive } =
      filters;

    const where: Prisma.AppointmentWhereInput = {
      clinicId: userClinicId,
      ...(includeInactive ? {} : { isActive: true }),
      ...(doctorId ? { doctorId } : {}),
      ...(patientId ? { patientId } : {}),
      ...(status && isAppointmentStatus(status) ? { status } : {}),
    };

    if (dateFrom || dateTo) {
      where.startAt = {
        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
        ...(dateTo ? { lte: new Date(dateTo) } : {}),
      };
    }

    return this.prisma.appointment.findMany({
      where,
      orderBy: { startAt: 'asc' },
      include: { patient: true, doctor: true },
    });
  }

  async findOne(id: string, userClinicId: string) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id, clinicId: userClinicId },
      include: { patient: true, doctor: true },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }

    return appointment;
  }

  async create(userClinicId: string, createAppointmentDto: CreateAppointmentDto) {
    const { patientId, doctorId, startAt, endAt, ...rest } =
      createAppointmentDto;

    if (!patientId || !doctorId || !startAt || !endAt) {
      throw new BadRequestException(
        'patientId, doctorId, startAt and endAt are required',
      );
    }

    const startDate = new Date(startAt);
    const endDate = new Date(endAt);

    this.validateDateRange(startDate, endDate);

    await this.validatePatient(patientId, userClinicId);
    await this.validateDoctor(doctorId, userClinicId);
    await this.checkDoctorConflict(userClinicId, doctorId, startDate, endDate);

    return this.prisma.appointment.create({
      data: {
        ...rest,
        patientId,
        doctorId,
        startAt: startDate,
        endAt: endDate,
        clinicId: userClinicId,
      },
      include: { patient: true, doctor: true },
    });
  }

  async update(
    id: string,
    userClinicId: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const existing = await this.findOne(id, userClinicId);

    const { patientId, doctorId, startAt, endAt, ...rest } =
      updateAppointmentDto;

    if (patientId !== undefined) {
      await this.validatePatient(patientId, userClinicId);
    }

    if (doctorId !== undefined) {
      await this.validateDoctor(doctorId, userClinicId);
    }

    const nextStartAt = startAt ? new Date(startAt) : existing.startAt;
    const nextEndAt = endAt ? new Date(endAt) : existing.endAt;

    this.validateDateRange(nextStartAt, nextEndAt);

    if (
      doctorId !== undefined ||
      startAt !== undefined ||
      endAt !== undefined
    ) {
      const nextDoctorId = doctorId ?? existing.doctorId;

      await this.checkDoctorConflict(
        userClinicId,
        nextDoctorId,
        nextStartAt,
        nextEndAt,
        id,
      );
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...rest,
        ...(patientId !== undefined ? { patientId } : {}),
        ...(doctorId !== undefined ? { doctorId } : {}),
        ...(startAt !== undefined ? { startAt: nextStartAt } : {}),
        ...(endAt !== undefined ? { endAt: nextEndAt } : {}),
      },
      include: { patient: true, doctor: true },
    });
  }

  async softDelete(id: string, userClinicId: string) {
    await this.findOne(id, userClinicId);

    return this.prisma.appointment.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private async validatePatient(patientId: string, userClinicId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: patientId, clinicId: userClinicId },
    });

    if (!patient || !patient.isActive) {
      throw new BadRequestException(
        'patientId must reference an active patient within the same clinic',
      );
    }
  }

  private async validateDoctor(doctorId: string, userClinicId: string) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { id: doctorId, clinicId: userClinicId },
    });

    if (!doctor || !doctor.isActive) {
      throw new BadRequestException(
        'doctorId must reference an active doctor within the same clinic',
      );
    }
  }

  private validateDateRange(startAt: Date, endAt: Date) {
    if (endAt <= startAt) {
      throw new BadRequestException('endAt must be after startAt');
    }
  }

  private async checkDoctorConflict(
    userClinicId: string,
    doctorId: string,
    startAt: Date,
    endAt: Date,
    excludeAppointmentId?: string,
  ) {
    const conflict = await this.prisma.appointment.findFirst({
      where: {
        clinicId: userClinicId,
        doctorId,
        isActive: true,
        status: { notIn: NON_CONFLICTING_STATUSES },
        startAt: { lt: endAt },
        endAt: { gt: startAt },
        ...(excludeAppointmentId ? { id: { not: excludeAppointmentId } } : {}),
      },
    });

    if (conflict) {
      throw new BadRequestException(
        'This doctor already has an active appointment in the selected time range',
      );
    }
  }
}
