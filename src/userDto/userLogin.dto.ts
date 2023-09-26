import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDto {
  

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
