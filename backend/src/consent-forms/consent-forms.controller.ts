import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConsentFormsService } from './consent-forms.service';
import { CreateConsentFormDto } from './dto/create-consent-form.dto';
import { UpdateConsentFormDto } from './dto/update-consent-form.dto';
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
    return this.consentFormsService.findAll(
      {
        userId: request.user!.id,
        clinicId: request.user!.clinicId,
        role: request.user!.role,
      },
      {
        includeInactive: includeInactive === 'true',
        patientId,
        status,
      },
    );
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.consentFormsService.findOne(id, {
      userId: request.user!.id,
      clinicId: request.user!.clinicId,
      role: request.user!.role,
    });
  }

  @Roles('ADMIN', 'SECRETARY')
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createConsentFormDto: CreateConsentFormDto,
  ) {
    return this.consentFormsService.create(
      request.user!.clinicId,
      createConsentFormDto,
    );
  }

  @Roles('ADMIN', 'SECRETARY')
  @Patch(':id')
  update(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() updateConsentFormDto: UpdateConsentFormDto,
  ) {
    return this.consentFormsService.update(
      id,
      request.user!.clinicId,
      updateConsentFormDto,
    );
  }

  @Roles('ADMIN', 'SECRETARY')
  @Delete(':id')
  remove(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.consentFormsService.softDelete(id, request.user!.clinicId);
  }
}
