export type UserRole = 'ADMIN' | 'SECRETARY' | 'DOCTOR';

export class CreateUserDto {
  clinicId: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive?: boolean;
}
