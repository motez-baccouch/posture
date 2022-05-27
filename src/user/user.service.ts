import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSubscribeDto } from './dto/UserSubscribe.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { Roles } from 'src/enums/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository : Repository<User>,
  ){}
  
  async create(createUserDto: CreateUserDto) {
    const user:User = await this.userRespository.create(createUserDto);
    user.role = Roles.USER;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRespository.save(user);
    } catch (e) {
      throw new ConflictException(`Le username et le email doivent être unique`);
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

 

}
