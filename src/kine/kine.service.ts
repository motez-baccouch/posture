import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKineDto } from './dto/create-kine.dto';
import { UpdateKineDto } from './dto/update-kine.dto';
import { Kine } from './entities/kine.entity';

@Injectable()
export class KineService {
  constructor(
    @InjectRepository(Kine)
    private readonly kineRespository : Repository<Kine>,
  ){}
  async create(createKineDto: CreateKineDto) {
    const kine:Kine = await this.kineRespository.create(createKineDto);
    
    return this.kineRespository.save(kine);
  }

  findAll() {
    return this.kineRespository.find();
  }

  findOne(id: number) {
    return this.kineRespository.findOne(id);
  }

  update(id: number, updateKineDto: UpdateKineDto) {
    return `This action updates a #${id} kine`;
  }

  remove(id: number) {
    return this.kineRespository.softDelete(id);
  }
}
