import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import {
  MESSAGE_PRIORITIES,
  type MessagePriorityValue,
} from '../types/message-priority.type';

export class CreateMessageDto {
  @IsUUID()
  receiverId: string;

  @IsString()
  @MaxLength(200)
  subject: string;

  @IsString()
  @MaxLength(5000)
  content: string;

  @IsOptional()
  @IsIn(MESSAGE_PRIORITIES)
  priority?: MessagePriorityValue;
}
