import type { UserRole } from './create-user.dto';

export class UpdateUserDto {
  fullName?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}
