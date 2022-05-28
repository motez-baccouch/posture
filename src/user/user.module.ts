import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { JwtStrategy } from './strategy/passport-jwt.strategy';


@Module({
  imports: [
    MulterModule.register({
      dest:'../UploadedFiles/images',
    }),
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
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
  
})
export class UserModule {}
