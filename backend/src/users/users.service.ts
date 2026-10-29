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
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';

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

  async findOne(id: string, clinicId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, clinicId },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async create(clinicId: string, createUserDto: CreateUserDto) {
    const { fullName, email, password, role, isActive } = createUserDto;

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

  async update(
    id: string,
    currentUser: AuthenticatedUser,
    updateUserDto: UpdateUserDto,
  ) {
    await this.findOne(id, currentUser.clinicId);

    const { fullName, email, role, isActive } = updateUserDto;

    // An admin locking themselves out (deactivate / demote) would leave the
    // clinic without anyone able to manage users.
    if (
      id === currentUser.id &&
      (isActive === false || (role && role !== 'ADMIN'))
    ) {
      throw new BadRequestException(
        'You cannot deactivate or change the role of your own account',
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
