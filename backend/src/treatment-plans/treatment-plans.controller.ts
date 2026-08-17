import { Controller, UseGuards } from '@nestjs/common';
import { TreatmentPlansService } from './treatment-plans.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('treatment-plans')
export class TreatmentPlansController {
  constructor(
    private readonly treatmentPlansService: TreatmentPlansService,
  ) {}
}
