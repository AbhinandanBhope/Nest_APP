import { IsString, IsInt, IsNotEmpty, IsEmail ,IsEnum} from 'class-validator';


export class UserUpateDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEnum([ 'user','admin'])
  role: string;
}
