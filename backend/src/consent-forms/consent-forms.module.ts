import { Module } from '@nestjs/common';
import { ConsentFormsController } from './consent-forms.controller';
import { ConsentFormsService } from './consent-forms.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ConsentFormsController],
  providers: [ConsentFormsService],
})
export class ConsentFormsModule {}
