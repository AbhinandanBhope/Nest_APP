import { Module } from '@nestjs/common';
import { User } from 'dataBase/entity/user.entity';
import { UserService } from '../User/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'dataBase/database.module';
import { AuthService } from './auth.service';
import { UserModule } from '../User/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserService, JwtService, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
