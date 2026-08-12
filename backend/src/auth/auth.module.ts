import { Module } from '@nestjs/common';
import { JwtModule, type JwtModuleOptions } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ?? '1d') as NonNullable<
  JwtModuleOptions['signOptions']
>['expiresIn'];

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'cliniccrm-dev-secret',
      signOptions: {
        expiresIn: jwtExpiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
