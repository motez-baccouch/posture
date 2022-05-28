import { PartialType } from '@nestjs/mapped-types';
import { Kine } from '../entities/kine.entity';
import { CreateKineDto } from './create-kine.dto';

export class UpdateKineDto extends PartialType(Kine) {}
