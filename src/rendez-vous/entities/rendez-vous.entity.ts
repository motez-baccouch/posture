import { isUUID } from "class-validator";
import { TimeStampEntity } from "src/Generics/timestamp.entities";
import { PrimaryGeneratedColumn, Timestamp } from "typeorm";

export class RendezVous extends TimeStampEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
}
