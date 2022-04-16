import { RendezVous } from "src/rendez-vous/entities/rendez-vous.entity";
import { Entity, ObjectIdColumn , ObjectID, Column, BaseEntity,OneToMany } from "typeorm";

@Entity('Kine')
export class Kine extends BaseEntity{
@ObjectIdColumn() id : ObjectID ;
@Column() nom_agence : string;
@Column() email : string ;
@Column() password : string ; 
@Column() numero : number;
@Column() photoUrl?: string;
//@Column() anniversaire: Date;
@Column() ville : string;
@Column() codePostal : number;
@Column() location : string;
@OneToMany(
    Type => RendezVous,
    (rendezVous)=>rendezVous.kine,
   
)
rendezVous:RendezVous;
}
