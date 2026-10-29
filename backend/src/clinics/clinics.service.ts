import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const clinic = await this.prisma.clinic.findUnique({ where: { id } });

    if (!clinic) {
      throw new NotFoundException(`Clinic with id ${id} not found`);
    }

    return clinic;
  }

  async update(id: string, updateClinicDto: UpdateClinicDto) {
    await this.findOne(id);

    return this.prisma.clinic.update({
      where: { id },
      data: updateClinicDto,
    });
  }
}
