import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

// Clinics are tenants: a user can only ever see or edit the clinic in their
// own token. Creating clinics is a platform-level operation (see seed.ts).
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get('me')
  findOwn(@Req() request: RequestWithUser) {
    return this.clinicsService.findOne(request.user!.clinicId);
  }

  @Roles('ADMIN')
  @Patch('me')
  updateOwn(
    @Req() request: RequestWithUser,
    @Body() updateClinicDto: UpdateClinicDto,
  ) {
    return this.clinicsService.update(request.user!.clinicId, updateClinicDto);
  }
}
