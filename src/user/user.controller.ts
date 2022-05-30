import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UploadedFile, UseGuards, UseInterceptors, Query } from '@nestjs/common';
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
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
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
    console.log("hedha howa el user ",user);
    return  this.userService.update(Number(user.id),{...user,photoUrl:file});
  }

  @Get('/kine/filter')
  @UseGuards(JwtAuthGuard)
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
                    if(ableToTravel)
                    options["ableToTravel"]=ableToTravel;
                    options["role"]= Roles.KINE;
                    return this.userService.findAllByFilter(options);
    
  }
}
