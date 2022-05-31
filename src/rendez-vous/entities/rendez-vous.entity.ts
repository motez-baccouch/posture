
import { TimeStampEntity } from "src/Generics/timestamp.entities";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('RendezVous')
export class RendezVous extends BaseEntity {
    @ObjectIdColumn() id : ObjectID ;
    @ManyToOne(Type => User , 
        (user)=>user.rendezVous,
        {
            cascade:true,
            eager:true,
        }
    )
    user: User;
    @Column()
    date:Date;
    @ManyToOne(Type => User , 
        (user)=>user.rendezVous,
        {
            cascade:true,
            eager:true,
        }
    )
    kine: User;
}
