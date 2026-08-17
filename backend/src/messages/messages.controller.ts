import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query('isRead') isRead?: string,
    @Query('priority') priority?: string,
  ) {
    if (isRead !== undefined && isRead !== 'true' && isRead !== 'false') {
      throw new BadRequestException('Invalid isRead filter');
    }

    const parsedIsRead =
      isRead === undefined ? undefined : isRead === 'true';

    return this.messagesService.findAll(
      {
        userId: request.user!.id,
        clinicId: request.user!.clinicId,
        role: request.user!.role,
      },
      {
        isRead: parsedIsRead,
        priority,
      },
    );
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.messagesService.findOne(id, {
      userId: request.user!.id,
      clinicId: request.user!.clinicId,
      role: request.user!.role,
    });
  }
}
