import { Entity, ObjectIdColumn , ObjectID, Column } from "typeorm";

@Entity('User')
export class User {
@ObjectIdColumn() id : ObjectID ;
@Column() nom : string;
@Column() prenom : string ;
@Column() email : string ;
@Column() numero : number;
@Column() age : number ; 
@Column() photoUrl?: string;
//@Column() anniversaire: Date;
@Column() ville : string;
@Column() codePostal : number;
@Column() location : string;
@Column() sexe : string;
}
