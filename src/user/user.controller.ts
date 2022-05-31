import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UploadedFile, UseGuards, UseInterceptors, Query, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSubscribeDto } from './dto/UserSubscribe.dto';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { fileURLToPath } from 'url';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './entities/user.entity';
import { genderEnum } from 'src/enums/gender.enum';
import { Roles } from 'src/enums/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const user: User = req.user;
    if(req.user.role == Roles.ADMIN)
    return this.userService.findAllUsers();
    else
    return new UnauthorizedException();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    const user = await this.findOne(id);
    console.log(typeof(req.user.id))
    console.log(typeof(user.id))
    if(req.user.role == Roles.ADMIN || user.email == req.user.email)
    return this.userService.update(user.id, updateUserDto);
    else
    return new UnauthorizedException();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    const user = await this.findOne(id);
    if(req.user.role == Roles.ADMIN || user.email == req.user.email)
    return this.userService.remove(user.id);
    else
    return new UnauthorizedException();
  }
  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.userService.login(credentials);
  }
 
  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file, @Request() req){
    const user: User = req.user.user;
    return  this.userService.update(Number(user.id),{...user,photoUrl:file});
  }

  @Get('/kine/filter')
  async findAllByFilter(@Query('age') age: number,
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
                    if(ableToTravel)
                    options["ableToTravel"]=ableToTravel;
                    options["role"]= Roles.KINE;
                    return await this.userService.findAllByFilter(options);
    
  }

}



