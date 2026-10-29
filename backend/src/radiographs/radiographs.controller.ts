import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { RadiographsService } from './radiographs.service';
import { CreateRadiographDto } from './dto/create-radiograph.dto';
import { MAX_RADIOGRAPH_FILE_SIZE } from './radiograph-storage';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('radiographs')
export class RadiographsController {
  constructor(private readonly radiographsService: RadiographsService) {}

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query('patientId') patientId?: string,
    @Query('includeInactive') includeInactive?: string,
  ) {
    return this.radiographsService.findAll(request.user!, {
      patientId,
      includeInactive: includeInactive === 'true',
    });
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.radiographsService.findOne(id, request.user!);
  }

  // Served through the API (not a static folder) so every image request goes
  // through the same auth and clinic/doctor scope checks as the metadata.
  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Get(':id/file')
  async getFile(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const { buffer, mimeType } = await this.radiographsService.getFile(
      id,
      request.user!,
    );

    response.set({
      'Content-Type': mimeType,
      'Content-Length': buffer.length,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.send(buffer);
  }

  @Roles('ADMIN', 'SECRETARY', 'DOCTOR')
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MAX_RADIOGRAPH_FILE_SIZE, files: 1 },
    }),
  )
  create(
    @Req() request: RequestWithUser,
    @Body() createRadiographDto: CreateRadiographDto,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    return this.radiographsService.create(
      request.user!,
      createRadiographDto,
      file,
    );
  }

  @Roles('ADMIN', 'SECRETARY')
  @Delete(':id')
  remove(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.radiographsService.softDelete(id, request.user!.clinicId);
  }
}
