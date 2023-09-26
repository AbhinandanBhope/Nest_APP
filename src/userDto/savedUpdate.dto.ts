import { IsString, IsInt, IsNotEmpty, IsEmail ,IsEnum} from 'class-validator';


export class SavedUpdate {
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

  @IsString()
  @IsEnum([ 'user','admin'])
  role: string;
}
