import { IsString, IsInt, IsNotEmpty, IsEmail ,IsEnum} from 'class-validator';


export class UserDelete{
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isDeleted:Date


  @IsString()
  @IsEnum([ 'user','admin'])
  role: string;
}
