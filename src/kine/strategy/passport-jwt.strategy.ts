import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Kine } from '../entities/kine.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Kine)
    private kineRepository: Repository<Kine>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: PayloadInterface) {
    // j'ai récupéré mon user
    console.log(payload);
    const kine = await this.kineRepository.findOne({email: payload.username});
    // Si le user exste je le retourne et la automatiquement ce que je retourne dans validate
    // est mis dans le request
    if (kine) {
      delete kine.salt;
      delete kine.password;
      return kine;
    } else {
      // Si non je déclenche une erreur
      throw new UnauthorizedException();
    }

  }