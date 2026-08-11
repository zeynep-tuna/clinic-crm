import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClinicsModule } from './clinics/clinics.module';

@Module({
  imports: [PrismaModule, ClinicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
