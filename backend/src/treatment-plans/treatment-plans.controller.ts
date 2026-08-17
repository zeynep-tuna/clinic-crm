import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TreatmentPlansService } from './treatment-plans.service';
import { CreateTreatmentPlanDto } from './dto/create-treatment-plan.dto';
import { UpdateTreatmentPlanDto } from './dto/update-treatment-plan.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('treatment-plans')
export class TreatmentPlansController {
  constructor(
    private readonly treatmentPlansService: TreatmentPlansService,
  ) {}

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query('includeInactive') includeInactive?: string,
    @Query('patientId') patientId?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    return this.treatmentPlansService.findAll(
      {
        userId: request.user!.id,
        clinicId: request.user!.clinicId,
        role: request.user!.role,
      },
      {
        includeInactive: includeInactive === 'true',
        patientId,
        status,
        priority,
      },
    );
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.treatmentPlansService.findOne(id, {
      userId: request.user!.id,
      clinicId: request.user!.clinicId,
      role: request.user!.role,
    });
  }

  @Roles('DOCTOR')
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createTreatmentPlanDto: CreateTreatmentPlanDto,
  ) {
    return this.treatmentPlansService.create(
      {
        userId: request.user!.id,
        clinicId: request.user!.clinicId,
        role: request.user!.role,
      },
      createTreatmentPlanDto,
    );
  }

  @Roles('DOCTOR')
  @Patch(':id')
  update(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() updateTreatmentPlanDto: UpdateTreatmentPlanDto,
  ) {
    return this.treatmentPlansService.update(
      id,
      {
        userId: request.user!.id,
        clinicId: request.user!.clinicId,
        role: request.user!.role,
      },
      updateTreatmentPlanDto,
    );
  }
}
