import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  PAYMENT_METHODS,
  type PaymentMethodValue,
} from './types/payment-method.type';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userClinicId: string, includeInactive?: boolean) {
    const where: Prisma.PaymentWhereInput = {
      clinicId: userClinicId,
      ...(includeInactive ? {} : { isActive: true }),
    };

    return this.prisma.payment.findMany({
      where,
      orderBy: { paymentDate: 'desc' },
      include: { patient: true, appointment: true },
    });
  }

  async findOne(id: string, userClinicId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { id, clinicId: userClinicId },
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
}
