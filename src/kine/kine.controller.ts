import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Options } from '@nestjs/common';
import { KineService } from './kine.service';
import { CreateKineDto } from './dto/create-kine.dto';
import { UpdateKineDto } from './dto/update-kine.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Kine } from './entities/kine.entity';
import { genderEnum } from 'src/enums/gender.enum';
import { query } from 'express';

@Controller('kine')
export class KineController {
  constructor(private readonly kineService: KineService) {}

  @Post()
  create(@Body() createKineDto: CreateKineDto) {
    return this.kineService.create(createKineDto);
  }

  @Get()
  findAll() {
    return this.kineService.findAll();
  }

  @Get('filter')
  findAllByFilter(@Query('age') age: number,
                  @Query('gender') gender: genderEnum,
                  @Query('ableToTravel') ableToTravel: boolean,
                  @Query('ville') ville: string){
                    var options = {};
                    if(age)
                    options["age"]=age;
                    if(gender)
                    options["gender"]=gender;
                    if(ville)
                    options["ville"]=ville;
                    options["ableToTravel"]=ableToTravel;
                    return this.kineService.findAllByFilter(options);
    
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("hereeee");
    return this.kineService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKineDto: UpdateKineDto) {
    return this.kineService.update(+id, updateKineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kineService.remove(+id);
  }
}
