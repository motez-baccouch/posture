import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { Roles } from 'src/enums/roles.enum';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository : Repository<User>,
    private jwtService : JwtService,
  ){}

  
  
  async create(createUserDto: CreateUserDto) {
    const user:User =  await this.userRespository.create(createUserDto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      return await this.userRespository.save(user);
    } catch (e) {
      throw new ConflictException(`error`);
    }
    
  }

  findAllUsers() {
    return this.userRespository.find();
  }

  findOne(id: any) {
    return this.userRespository.findOne(id);
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    return await this.userRespository.update({id:id},updateUserDto);
  }

  remove(id: any) {
    return this.userRespository.softDelete(id);
  }

  findAllByFilter(options){
    return this.userRespository.findAndCount(options as FindManyOptions<User>)
  }

 
  async login(credentials: LoginCredentialsDto)  {

    // Récupére le login et le mot de passe
     const {username, password} = credentials;
    // Vérifier est ce qu'il y a un user avec ce login ou ce mdp
    const user = await this.userRespository.findOne( {email : username} );
    // console.log(user);
    // Si not user je déclenche une erreur

    if (!user)
      throw new NotFoundException('username ou password erronée');
    // Si oui je vérifie est ce que le mot est correct ou pas
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        email: user.email,
        role: user.role
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        "access_token" : jwt
      };
    } else {
      // Si mot de passe incorrect je déclenche une erreur
      throw new NotFoundException('username ou password erronée');
    }
  }

}
