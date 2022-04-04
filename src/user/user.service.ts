import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository : Repository<User>,
  ){}
  
  async create(createUserDto: CreateUserDto) {
    const user:User = await this.userRespository.create(createUserDto);
    
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
