import { Module } from '@nestjs/common';
import { KineService } from './kine.service';
import { KineController } from './kine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kine } from './entities/kine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kine])],
  controllers: [KineController],
  providers: [KineService]
})
export class KineModule {}
