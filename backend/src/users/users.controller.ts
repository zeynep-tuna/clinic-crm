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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

// Every route is scoped to the clinic in the caller's JWT; clinicId is never
// read from the query or body.
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query('includeInactive') includeInactive?: string,
  ) {
    return this.usersService.findAll(
      request.user!.clinicId,
      includeInactive === 'true',
    );
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get('colleagues')
  findColleagues(@Req() request: RequestWithUser) {
    return this.usersService.findColleagues(
      request.user!.clinicId,
      request.user!.id,
    );
  }

  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.usersService.findOne(id, request.user!.clinicId);
  }

  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(request.user!.clinicId, createUserDto);
  }

  @Patch(':id')
  update(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, request.user!, updateUserDto);
  }
}
