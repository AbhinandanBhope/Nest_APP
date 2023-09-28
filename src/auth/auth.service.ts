import { Injectable } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { Md5 } from 'ts-md5';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService:JwtService,
    private readonly emailService:EmailService) {}

  async validateUser(username: any, pass: string): Promise<any> {
    const user = await this.userService.findUser(username);
    console.log(user);
     pass= Md5.hashStr(pass);
    if (user && user.password === pass) {

      const result = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
     user = await this.userService.findUser(user.email);
    const payload = { username: user.first_name, sub: user.id };
 
    

    return {
      access_token: this.jwtService.sign(payload,{secret:process.env.JWT_TOKEN , expiresIn:"60000000000" } ),
    };
  }
  
  

}
