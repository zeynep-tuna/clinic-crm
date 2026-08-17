import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TreatmentPlansService {
  constructor(private readonly prisma: PrismaService) {}
}
