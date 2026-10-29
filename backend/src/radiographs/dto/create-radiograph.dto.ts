import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  RADIOGRAPH_TYPES,
  type RadiographTypeValue,
} from '../types/radiograph-type.type';

// Text fields of the multipart upload; the image itself arrives as `file`.
export class CreateRadiographDto {
  @IsUUID()
  patientId: string;

  @IsOptional()
  @IsIn(RADIOGRAPH_TYPES)
  type?: RadiographTypeValue;

  @IsOptional()
  @IsDateString()
  takenAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;
}
