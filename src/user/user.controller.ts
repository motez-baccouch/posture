import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UploadedFile, UseGuards, UseInterceptors, Query,  UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './entities/user.entity';
import { genderEnum } from 'src/enums/gender.enum';
import { Roles } from 'src/enums/roles.enum';
import { ObjectID } from 'typeorm';

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
    console.log("hedha howa el user ",user);
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
  async update(@Param('id') id: ObjectID, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    const user: User = req.user;
    const userToUpdate = await this.userService.findOne(id);
    const userToUpdateId = userToUpdate.id;
    if(user.role == Roles.ADMIN || userToUpdateId == user.id)
    return await this.userService.update(userToUpdateId, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: any) {
    return this.userService.remove(id);
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
  async uploadFile(@UploadedFile() file, @Request() req){
    const user: User = req.user;
    const filename = file["path"] + ".jpg"
    return  await this.userService.update(user.id,{photoUrl: filename});
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
