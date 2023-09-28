import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'dataBase/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Md5 } from 'ts-md5';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthService } from 'src/auth/auth.service';
import { SavedUser } from 'src/userDto/savedUser.dto';
import { UserDto } from 'src/userDto/user.dto';
import { UserLoginDto } from 'src/userDto/userLogin.dto';
import { UserUpateDto } from 'src/userDto/userUpdate.dto';
import { UserDelete } from 'src/userDto/userDelete.dto';
import { SavedUpdate } from 'src/userDto/savedUpdate.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(User)
    private jwtService: JwtService,
    private readonly emailService:EmailService
  ) {}
  async getUser(userId:string): Promise<any> {


   const  NuserId=Number(userId);

  


   
    if(Number.isNaN(NuserId)){
      throw new BadRequestException("Not valid Input", {
        cause: new Error(),
        description: 'Some error description',
      });

      


    }
    try{const userFound = await this.userRepository.findOneBy({
      id:NuserId,
    });
    if(!userFound || userFound.isDeleted){
      throw new NotFoundException('User Not found', {
        cause: new Error(),
        description: 'Not found',
      });

    }
    return userFound;


    }
    catch(error){
      throw new BadRequestException(error, {
        cause: new Error(),
        description: 'Some error description',
      });


    }
    
  }
  async createUser(userBody: UserDto): Promise<SavedUser> {
    try {
      const userFound = await this.userRepository.findOneBy({
        email: userBody.email,
      });
      if (userFound) {
        throw new NotFoundException('User already exist with this email!', {
          cause: new Error(),
          description: 'Duplicate found',
        });
      }

      const user = new User();
      const pass= Math.random().toString(36).slice(2) +
      Math.random().toString(36)
      .toUpperCase().slice(2);
      const Useremail =userBody.email;
      user.first_name = userBody.first_name;
      user.last_name = userBody.last_name; 
      user.password =  Md5.hashStr(pass);
      user.email = userBody.email;
      user.role = userBody.role;
      const email =  await this.sendEmail( userBody.email,pass);
      console.log("emai",userBody.email);

      const userSaved = await this.userRepository.save(user);

      return userSaved;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error, {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }

  async findUser(userEmail) {
    try {
      const userFound = await this.userRepository.findOneBy({
        email: userEmail,
      });
      if (userFound.isDeleted) {
        return null;
      }
      return userFound;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async updateUser(body: UserUpateDto, Id):Promise<SavedUpdate> {
    try {
      
      const userFound = await this.userRepository.findOneBy({
        id: Id,
      });
      if (!userFound || userFound.isDeleted) {
        throw new NotFoundException('User not found', {
          cause: new Error(),
          description: 'User not found',
        });
      }

      const { first_name, last_name, role, password } = body;
      userFound.first_name = first_name;
      userFound.last_name = last_name;
      userFound.password = Md5.hashStr(password);
      userFound.role = role;

      const userSaved = await this.userRepository.save(userFound);
      return userSaved;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error, {
        cause: new Error(),
        description: 'Something went worng',
      });
    }
  }
  async deleteUser(userid): Promise<UserDelete> {
    try {
      const userFound = await this.userRepository.findOneBy({
        id: userid,
      });

      if (!userFound || userFound.isDeleted) {
        throw new NotFoundException('User not found', {
          cause: new Error(),
          description: 'User not found',
        });
      }
      userFound.isDeleted = new Date();

      const userSaved = await this.userRepository.save(userFound);

      return userSaved;
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
        description: 'Something went worng',
      });
    }
  }
  
  async sendEmail (email ,pass){
    await this.emailService.sendEmail(email ,pass
     
    );
    return 'Email sent!';

  }
  
}
