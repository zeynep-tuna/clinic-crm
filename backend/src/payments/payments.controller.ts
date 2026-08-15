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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query('includeInactive') includeInactive?: string,
  ) {
    return this.paymentsService.findAll(
      request.user!.clinicId,
      includeInactive === 'true',
    );
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.paymentsService.findOne(id, request.user!.clinicId);
  }

  @Roles('ADMIN', 'SECRETARY')
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentsService.create(
      request.user!.clinicId,
      createPaymentDto,
    );
  }

  @Roles('ADMIN', 'SECRETARY')
  @Patch(':id')
  update(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(
      id,
      request.user!.clinicId,
      updatePaymentDto,
    );
  }

  @Roles('ADMIN', 'SECRETARY')
  @Delete(':id')
  remove(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.paymentsService.softDelete(id, request.user!.clinicId);
  }
}
