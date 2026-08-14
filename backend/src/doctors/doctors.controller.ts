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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query('search') search?: string,
    @Query('includeInactive') includeInactive?: string,
  ) {
    return this.doctorsService.findAll(
      request.user!.clinicId,
      search,
      includeInactive === 'true',
    );
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.doctorsService.findOne(id, request.user!.clinicId);
  }

  @Roles('ADMIN', 'SECRETARY')
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    return this.doctorsService.create(request.user!.clinicId, createDoctorDto);
  }

  @Roles('ADMIN', 'SECRETARY')
  @Patch(':id')
  update(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorsService.update(
      id,
      request.user!.clinicId,
      updateDoctorDto,
    );
  }

  @Roles('ADMIN', 'SECRETARY')
  @Delete(':id')
  remove(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.doctorsService.softDelete(id, request.user!.clinicId);
  }
}
