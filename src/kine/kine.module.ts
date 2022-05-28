import { Module } from '@nestjs/common';
import { KineService } from './kine.service';
import { KineController } from './kine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kine } from './entities/kine.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from 'src/kine/strategy/passport-jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Kine]),
  PassportModule.register({
    defaultStrategy : "jwt"
  }),
  JwtModule.register({
    secret:'postureSecretKey',
    signOptions :{
      expiresIn : 3600
    }
  })],
  controllers: [KineController],
  providers: [KineService,JwtStrategy]
})
export class KineModule {}
