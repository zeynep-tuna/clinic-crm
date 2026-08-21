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
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query('search') search?: string,
    @Query('includeInactive') includeInactive?: string,
  ) {
    return this.patientsService.findAll(
      {
        userId: request.user!.id,
        clinicId: request.user!.clinicId,
        role: request.user!.role,
      },
      search,
      includeInactive === 'true',
    );
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.patientsService.findOne(id, {
      userId: request.user!.id,
      clinicId: request.user!.clinicId,
      role: request.user!.role,
    });
  }

  @Roles('ADMIN', 'SECRETARY')
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createPatientDto: CreatePatientDto,
  ) {
    return this.patientsService.create(
      request.user!.clinicId,
      createPatientDto,
    );
  }

  @Roles('ADMIN', 'SECRETARY')
  @Patch(':id')
  update(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(
      id,
      request.user!.clinicId,
      updatePatientDto,
    );
  }

  @Roles('ADMIN', 'SECRETARY')
  @Delete(':id')
  remove(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.patientsService.softDelete(id, request.user!.clinicId);
  }
}
