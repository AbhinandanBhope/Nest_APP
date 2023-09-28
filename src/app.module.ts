import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'dataBase/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './User/user.service';
import { UserController } from './User/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import { User } from 'dataBase/entity/user.entity';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { EmailService } from './email/email.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    TypeOrmModule.forFeature([User]),
    AppModule,
    AuthModule,
    User,  ConfigModule.forRoot({envFilePath:['.env'],}), 
    
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, JwtService, AuthService, EmailService],
  
})
export class AppModule {}
