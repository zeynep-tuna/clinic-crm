import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';

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
}
