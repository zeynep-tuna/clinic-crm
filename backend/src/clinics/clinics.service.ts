import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.clinic.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const clinic = await this.prisma.clinic.findUnique({ where: { id } });

    if (!clinic) {
      throw new NotFoundException(`Clinic with id ${id} not found`);
    }

    return clinic;
  }

  create(createClinicDto: CreateClinicDto) {
    return this.prisma.clinic.create({ data: createClinicDto });
  }

  async update(id: string, updateClinicDto: UpdateClinicDto) {
    await this.findOne(id);

    return this.prisma.clinic.update({
      where: { id },
      data: updateClinicDto,
    });
  }
}
