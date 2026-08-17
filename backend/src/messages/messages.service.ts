import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client';
import type { UserRole } from '../auth/types/role.type';
import {
  MESSAGE_PRIORITIES,
  type MessagePriorityValue,
} from './types/message-priority.type';
import { CreateMessageDto } from './dto/create-message.dto';

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

  async create(requestingUser: RequestingUser, dto: CreateMessageDto) {
    if (dto.receiverId === requestingUser.userId) {
      throw new BadRequestException('Cannot send message to yourself');
    }

    await this.validateReceiver(dto.receiverId, requestingUser.clinicId);

    const subject = this.validateSubject(dto.subject);
    const content = this.validateContent(dto.content);
    const priority = this.validatePriority(dto.priority);

    return this.prisma.message.create({
      data: {
        clinicId: requestingUser.clinicId,
        senderId: requestingUser.userId,
        receiverId: dto.receiverId,
        subject,
        content,
        ...(priority !== undefined ? { priority } : {}),
      },
      include: {
        sender: { select: messageUserSelect },
        receiver: { select: messageUserSelect },
      },
    });
  }

  private async validateReceiver(receiverId: string, userClinicId: string) {
    const receiver = await this.prisma.user.findFirst({
      where: { id: receiverId, clinicId: userClinicId, isActive: true },
    });

    if (!receiver) {
      throw new BadRequestException('Invalid receiver');
    }
  }

  private validateSubject(subject: string): string {
    if (typeof subject !== 'string' || !subject.trim()) {
      throw new BadRequestException('Invalid subject');
    }

    return subject.trim();
  }

  private validateContent(content: string): string {
    if (typeof content !== 'string' || !content.trim()) {
      throw new BadRequestException('Invalid content');
    }

    return content.trim();
  }

  private validatePriority(
    priority?: string,
  ): MessagePriorityValue | undefined {
    if (priority === undefined) {
      return undefined;
    }

    if (!isMessagePriority(priority)) {
      throw new BadRequestException('Invalid message priority');
    }

    return priority;
  }
}
