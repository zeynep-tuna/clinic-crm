import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export type UserRole = 'ADMIN' | 'SECRETARY' | 'DOCTOR';

export const USER_ROLES: UserRole[] = ['ADMIN', 'SECRETARY', 'DOCTOR'];

export class CreateUserDto {
  @IsString()
  @MaxLength(150)
  fullName: string;

  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(128)
  password: string;

  @IsIn(USER_ROLES)
  role: UserRole;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
