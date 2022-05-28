import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateKineDto } from './dto/create-kine.dto';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { UpdateKineDto } from './dto/update-kine.dto';
import { Kine } from './entities/kine.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/enums/roles.enum';


@Injectable()
export class KineService {
  constructor(
    @InjectRepository(Kine)
    private readonly kineRespository : Repository<Kine>,
    private jwtService : JwtService,
  ){}
  async create(createKineDto: CreateKineDto) {
    const kine:Kine = await this.kineRespository.create(createKineDto);
    kine.role = Roles.KINE;
    kine.salt = await bcrypt.genSalt();
    kine.password = await bcrypt.hash(kine.password, kine.salt);
    try {
      return await this.kineRespository.save(kine);
    } catch (e) {
      throw new ConflictException(`error`);
    }
    
  }

  findAllByFilter(options){
    return this.kineRespository.findAndCount(options as FindManyOptions<Kine>)
  }

  findAll() {
    return this.kineRespository.find();
  }

  findOne(id: number) {
    return this.kineRespository.findOne(id);
  }

  update(id: number, updateKineDto: UpdateKineDto) {
    return this.kineRespository.update({id:id},{});
  }

  remove(id: number) {
    return this.kineRespository.softDelete(id);
  }
  async login(credentials: LoginCredentialsDto)  {

    // Récupére le login et le mot de passe
     const {username, password} = credentials;
    // Vérifier est ce qu'il y a un user avec ce login ou ce mdp
    const kine = await this.kineRespository.findOne( {email : username} );
    // console.log(user);
    // Si not user je déclenche une erreur

    if (!kine)
      throw new NotFoundException('username ou password erronée');
    // Si oui je vérifie est ce que le mot est correct ou pas
    const hashedPassword = await bcrypt.hash(password, kine.salt);
    if (hashedPassword === kine.password) {
      const payload = {
        email: kine.email,
        role: kine.role
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
