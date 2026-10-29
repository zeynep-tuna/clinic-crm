import { Module } from '@nestjs/common';
import { RadiographsController } from './radiographs.controller';
import { RadiographsService } from './radiographs.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RadiographsController],
  providers: [RadiographsService],
})
export class RadiographsModule {}
