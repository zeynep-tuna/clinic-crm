import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ConsentFormsService } from './consent-forms.service';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('consent-forms')
export class ConsentFormsController {
  constructor(private readonly consentFormsService: ConsentFormsService) {}

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query('includeInactive') includeInactive?: string,
    @Query('patientId') patientId?: string,
    @Query('status') status?: string,
  ) {
    return this.consentFormsService.findAll(request.user!.clinicId, {
      includeInactive: includeInactive === 'true',
      patientId,
      status,
    });
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.consentFormsService.findOne(id, request.user!.clinicId);
  }
}
