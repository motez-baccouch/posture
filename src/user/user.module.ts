import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from 'adminjs';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy : "jwt"
    }),
    JwtModule.register({
      secret:'postureSecretKey',
      signOptions :{
        expiresIn : 3600
      }
    })
],
  controllers: [UserController,AppController],
  providers: [UserService]
  
})
export class UserModule {}
