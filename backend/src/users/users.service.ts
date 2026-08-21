import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../common/utils/password.util';

const VALID_ROLES = ['ADMIN', 'SECRETARY', 'DOCTOR'];

const userSelect = {
  id: true,
  clinicId: true,
  fullName: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(clinicId: string, includeInactive: boolean) {
    return this.prisma.user.findMany({
      where: includeInactive ? { clinicId } : { clinicId, isActive: true },
      orderBy: { createdAt: 'desc' },
      select: userSelect,
    });
  }

  findColleagues(clinicId: string, currentUserId: string) {
    return this.prisma.user.findMany({
      where: {
        clinicId,
        isActive: true,
        id: { not: currentUserId },
      },
      orderBy: { fullName: 'asc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { clinicId, fullName, email, password, role, isActive } =
      createUserDto;

    if (!VALID_ROLES.includes(role)) {
      throw new BadRequestException(
        `role must be one of: ${VALID_ROLES.join(', ')}`,
      );
    }

    const clinic = await this.prisma.clinic.findUnique({
      where: { id: clinicId },
    });

    if (!clinic) {
      throw new NotFoundException(`Clinic with id ${clinicId} not found`);
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(`A user with email ${email} already exists`);
    }

    const passwordHash = await hashPassword(password);

    return this.prisma.user.create({
      data: {
        clinicId,
        fullName,
        email,
        passwordHash,
        role,
        isActive: isActive ?? true,
      },
      select: userSelect,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const { fullName, email, role, isActive } = updateUserDto;

    if (role !== undefined && !VALID_ROLES.includes(role)) {
      throw new BadRequestException(
        `role must be one of: ${VALID_ROLES.join(', ')}`,
      );
    }

    if (email !== undefined) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(
          `A user with email ${email} already exists`,
        );
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: { fullName, email, role, isActive },
      select: userSelect,
    });
  }
}
