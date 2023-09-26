import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserLoginDto } from './userDto/userLogin.dto';
import { AuthGuard } from '@nestjs/passport/dist';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Body(new ValidationPipe()) userBody: UserLoginDto): any {
    return this.authService.login(userBody);
  }
}
