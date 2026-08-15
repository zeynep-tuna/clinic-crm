import { Controller, UseGuards } from '@nestjs/common';
import { ConsentFormsService } from './consent-forms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('consent-forms')
export class ConsentFormsController {
  constructor(private readonly consentFormsService: ConsentFormsService) {}
}
