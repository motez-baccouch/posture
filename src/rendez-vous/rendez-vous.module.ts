import { Module } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { RendezVousController } from './rendez-vous.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RendezVous } from './entities/rendez-vous.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RendezVous])],
  controllers: [RendezVousController],
  providers: [RendezVousService]
})
export class RendezVousModule {}
