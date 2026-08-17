import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClinicsModule } from './clinics/clinics.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';
import { ConsentFormsModule } from './consent-forms/consent-forms.module';
import { TreatmentPlansModule } from './treatment-plans/treatment-plans.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    PrismaModule,
    ClinicsModule,
    UsersModule,
    AuthModule,
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
    PaymentsModule,
    ConsentFormsModule,
    TreatmentPlansModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
