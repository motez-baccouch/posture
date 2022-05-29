import { Roles } from "src/enums/roles.enum";
import { RendezVous } from "src/rendez-vous/entities/rendez-vous.entity";
import { Entity, ObjectIdColumn , ObjectID, Column, BaseEntity, OneToMany, DeleteDateColumn } from "typeorm";

@Entity('User')
export class User extends BaseEntity{
@ObjectIdColumn() id : ObjectID ;
@Column() nom : string;
@Column() prenom : string ;
@Column() password : string ;
@Column() salt : string;
@Column({
    default: false
}) ableToTravel : boolean;
@Column({
    enum: Roles,
    type: "enum",
    default: Roles.USER
}
) role : Roles;
@Column() email : string ;
@Column() numero : number;
@Column() age : number ; 
@Column() photoUrl?: string;
@Column() ville : string;
@Column() codePostal : number;
@Column() location : string;
@Column() sexe : string;
@DeleteDateColumn() deletedAt : Date;
@OneToMany(
    Type => RendezVous,
    (rendezVous)=>rendezVous.user,
   
)
rendezVous:RendezVous;
}
