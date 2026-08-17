import type { MessagePriorityValue } from '../types/message-priority.type';

export class CreateMessageDto {
  receiverId: string;
  subject: string;
  content: string;
  priority?: MessagePriorityValue;
}
