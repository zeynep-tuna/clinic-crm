import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import type { UserRole } from '../auth/types/role.type';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  PAYMENT_METHODS,
  type PaymentMethodValue,
} from './types/payment-method.type';

export interface RequestingUser {
  userId: string;
  clinicId: string;
  role: UserRole;
}

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(requestingUser: RequestingUser, includeInactive?: boolean) {
    const where: Prisma.PaymentWhereInput = {
      clinicId: requestingUser.clinicId,
      ...(includeInactive ? {} : { isActive: true }),
    };

    if (requestingUser.role === 'DOCTOR') {
      const currentDoctor = await this.resolveCurrentDoctor(
        requestingUser.userId,
        requestingUser.clinicId,
      );
      where.appointment = { doctorId: currentDoctor.id };
    }

    return this.prisma.payment.findMany({
      where,
      orderBy: { paymentDate: 'desc' },
      include: { patient: true, appointment: true },
    });
  }

  async findOne(id: string, requestingUser: RequestingUser) {
    const where: Prisma.PaymentWhereInput = {
      id,
      clinicId: requestingUser.clinicId,
    };

    if (requestingUser.role === 'DOCTOR') {
      const currentDoctor = await this.resolveCurrentDoctor(
        requestingUser.userId,
        requestingUser.clinicId,
      );
      where.appointment = { doctorId: currentDoctor.id };
    }

    const payment = await this.prisma.payment.findFirst({
      where,
      include: { patient: true, appointment: true },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    return payment;
  }

  async create(userClinicId: string, dto: CreatePaymentDto) {
    await this.validatePatient(dto.patientId, userClinicId);
    await this.validateAppointment(
      dto.appointmentId,
      dto.patientId,
      userClinicId,
    );

    const amount = this.validateAmount(dto.amount);
    const paymentMethod = this.validatePaymentMethod(dto.paymentMethod);
    const paymentDate = this.validatePaymentDate(dto.paymentDate);

    return this.prisma.payment.create({
      data: {
        clinicId: userClinicId,
        patientId: dto.patientId,
        appointmentId: dto.appointmentId,
        amount,
        paymentMethod,
        ...(paymentDate ? { paymentDate } : {}),
        note: dto.note,
      },
      include: { patient: true, appointment: true },
    });
  }

  async update(id: string, userClinicId: string, dto: UpdatePaymentDto) {
    const existing = await this.findOne(id, {
      userId: '',
      clinicId: userClinicId,
      role: 'ADMIN',
    });

    const effectivePatientId = dto.patientId ?? existing.patientId;

    if (dto.patientId !== undefined) {
      await this.validatePatient(dto.patientId, userClinicId);
    }

    if (dto.appointmentId !== undefined) {
      await this.validateAppointment(
        dto.appointmentId,
        effectivePatientId,
        userClinicId,
      );
    } else if (dto.patientId !== undefined && existing.appointmentId) {
      await this.validateAppointment(
        existing.appointmentId,
        effectivePatientId,
        userClinicId,
      );
    }

    const amount =
      dto.amount !== undefined ? this.validateAmount(dto.amount) : undefined;
    const paymentMethod =
      dto.paymentMethod !== undefined
        ? this.validatePaymentMethod(dto.paymentMethod)
        : undefined;
    const paymentDate =
      dto.paymentDate !== undefined
        ? this.validatePaymentDate(dto.paymentDate)
        : undefined;

    return this.prisma.payment.update({
      where: { id },
      data: {
        ...(dto.patientId !== undefined ? { patientId: dto.patientId } : {}),
        ...(dto.appointmentId !== undefined
          ? { appointmentId: dto.appointmentId }
          : {}),
        ...(amount !== undefined ? { amount } : {}),
        ...(paymentMethod !== undefined ? { paymentMethod } : {}),
        ...(paymentDate !== undefined ? { paymentDate } : {}),
        ...(dto.note !== undefined ? { note: dto.note } : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
      },
      include: { patient: true, appointment: true },
    });
  }

  async softDelete(id: string, userClinicId: string) {
    await this.findOne(id, {
      userId: '',
      clinicId: userClinicId,
      role: 'ADMIN',
    });

    return this.prisma.payment.update({
      where: { id },
      data: { isActive: false },
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

  private async validateAppointment(
    appointmentId: string | undefined,
    patientId: string,
    userClinicId: string,
  ) {
    if (!appointmentId) {
      return;
    }

    const appointment = await this.prisma.appointment.findFirst({
      where: { id: appointmentId, clinicId: userClinicId, isActive: true },
    });

    if (!appointment || appointment.patientId !== patientId) {
      throw new BadRequestException('Invalid appointment');
    }
  }

  private validateAmount(amount: number): number {
    if (
      typeof amount !== 'number' ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      throw new BadRequestException('Invalid amount');
    }

    return amount;
  }

  private validatePaymentMethod(paymentMethod: string): PaymentMethodValue {
    if (!PAYMENT_METHODS.includes(paymentMethod as PaymentMethodValue)) {
      throw new BadRequestException('Invalid payment method');
    }

    return paymentMethod as PaymentMethodValue;
  }

  private validatePaymentDate(paymentDate?: string): Date | undefined {
    if (!paymentDate) {
      return undefined;
    }

    const date = new Date(paymentDate);

    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Invalid payment date');
    }

    return date;
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
