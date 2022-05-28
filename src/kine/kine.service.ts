import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateKineDto } from './dto/create-kine.dto';
import { UpdateKineDto } from './dto/update-kine.dto';
import { Kine } from './entities/kine.entity';
import { FilterOperator, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

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

  findAllByFilter(options){
    console.log(options);
    return this.kineRespository.findAndCount(options as FindManyOptions<Kine>)
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
