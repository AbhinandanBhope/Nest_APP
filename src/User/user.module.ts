import { Module } from '@nestjs/common';

import { DatabaseModule } from 'dataBase/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'dataBase/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { EmailService } from 'src/email/email.service';
import { GoogleStrategy } from 'src/auth/google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService,EmailService,GoogleStrategy],
  exports: [UserService]
})
export class UserModule {}
