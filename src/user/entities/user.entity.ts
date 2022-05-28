import { Roles } from "src/enums/roles.enum";
import { RendezVous } from "src/rendez-vous/entities/rendez-vous.entity";
import { Entity, ObjectIdColumn , ObjectID, Column, BaseEntity, OneToMany } from "typeorm";

@Entity('User')
export class User extends BaseEntity{
@ObjectIdColumn() id : ObjectID ;
@Column() nom : string;
@Column() prenom : string ;
@Column() password : string ;
@Column() salt : string;
@Column(
    {enum: Roles}
) role : string;
@Column() email : string ;
@Column() numero : number;
@Column() age : number ; 
@Column() photo?: string;
//@Column() anniversaire: Date;
@Column() ville : string;
@Column() codePostal : number;
@Column() location : string;
@Column() sexe : string;
@OneToMany(
    Type => RendezVous,
    (rendezVous)=>rendezVous.user,
   
)
rendezVous:RendezVous;
}
