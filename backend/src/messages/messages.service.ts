import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import type { UserRole } from '../auth/types/role.type';
import {
  MESSAGE_PRIORITIES,
  type MessagePriorityValue,
} from './types/message-priority.type';

export interface RequestingUser {
  userId: string;
  clinicId: string;
  role: UserRole;
}

export interface MessageFilters {
  isRead?: boolean;
  priority?: string;
}

const messageUserSelect = {
  id: true,
  clinicId: true,
  fullName: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

function isMessagePriority(value: string): value is MessagePriorityValue {
  return (MESSAGE_PRIORITIES as readonly string[]).includes(value);
}

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(requestingUser: RequestingUser, filters: MessageFilters = {}) {
    const { isRead, priority } = filters;

    if (priority !== undefined && !isMessagePriority(priority)) {
      throw new BadRequestException('Invalid message priority');
    }

    const where: Prisma.MessageWhereInput = {
      clinicId: requestingUser.clinicId,
      OR: [
        { senderId: requestingUser.userId },
        { receiverId: requestingUser.userId },
      ],
      ...(isRead !== undefined ? { isRead } : {}),
      ...(priority ? { priority } : {}),
    };

    return this.prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: messageUserSelect },
        receiver: { select: messageUserSelect },
      },
    });
  }

  async findOne(id: string, requestingUser: RequestingUser) {
    const message = await this.prisma.message.findFirst({
      where: {
        id,
        clinicId: requestingUser.clinicId,
        OR: [
          { senderId: requestingUser.userId },
          { receiverId: requestingUser.userId },
        ],
      },
      include: {
        sender: { select: messageUserSelect },
        receiver: { select: messageUserSelect },
      },
    });

    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    return message;
  }
}
