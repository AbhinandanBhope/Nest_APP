import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Put,
  UseGuards,Param,Request,Delete
} from '@nestjs/common';
import { UserDto } from 'src/userDto/user.dto';
import { UserService } from './user.service';
import { UserLoginDto } from 'src/userDto/userLogin.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserUpateDto } from  'src/userDto/userUpdate.dto'
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { SavedUser } from 'src/userDto/savedUser.dto';
import { UserDelete } from 'src/userDto/userDelete.dto';
import { SavedUpdate } from 'src/userDto/savedUpdate.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/:Id')
  getUserById(@Param()Id:string): any {
    
    
    return this.userService.getUser(Id['Id']);
  }

  @Post()
  post(@Body(new ValidationPipe()) userBody: UserDto):Promise<SavedUser> {
    console.log(userBody);
    return this.userService.createUser(userBody);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateUser(@Body(new ValidationPipe()) userBody: UserUpateDto,@Param() Id:string): Promise<SavedUpdate> {
    console.log('user',Id['id']);
    return this.userService.updateUser(userBody,Id['id']);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteUser( @Request() req, @Param() Id: string):Promise<UserDelete>{
    
    return this.userService.deleteUser(Id['id']);

  }



}