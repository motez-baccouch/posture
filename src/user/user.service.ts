import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const user:User = await this.userRespository.create(createUserDto);
    user.role = Roles.USER;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRespository.save(user);
    } catch (e) {
      throw new ConflictException(`error`);
    }
    return this.userRespository.save(user);
  }

  findAll() {
    return this.userRespository.find();
  }

  findOne(id: number) {
    return this.userRespository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRespository.softDelete(id);
  }

 
  async login(credentials: LoginCredentialsDto)  {

    // Récupére le login et le mot de passe
     const {username, password} = credentials;
    // On peut se logger ou via le username ou le password
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
