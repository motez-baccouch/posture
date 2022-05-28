import { genderEnum } from "src/enums/gender.enum";
import { Roles } from "src/enums/roles.enum";
import { RendezVous } from "src/rendez-vous/entities/rendez-vous.entity";
import { Entity, ObjectIdColumn , ObjectID, Column, BaseEntity,OneToMany, MoreThanOrEqual } from "typeorm";

@Entity('Kine')
export class Kine extends BaseEntity{
@ObjectIdColumn() id : ObjectID ;
@Column() nom_agence : string;
@Column() email : string ;
@Column() age: number;
@Column() password : string ; 
@Column() salt : string;
@Column(
    {
        type: 'enum',
        enum: Roles,
        default: Roles.KINE
    }
) role : string;
@Column() numero : number;
@Column() photoUrl: string;
//@Column() anniversaire: Date;
@Column() ville : string;
@Column() codePostal : number;
@Column() location : string;
@Column() gender: genderEnum;
@Column() ableToTravel: boolean;
@OneToMany(
    Type => RendezVous,
    (rendezVous)=>rendezVous.kine,
   
)
rendezVous:RendezVous;
}
