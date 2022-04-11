import { IsNumber, IsString } from "class-validator";

export class CreateKineDto {
@IsString()
nom_agence : string;
@IsString()
email : string ;
@IsString()
password : string ; 
@IsNumber()
numero : number;
@IsString()
photoUrl?: string;
@IsString()
ville : string;
@IsNumber()
codePostal : number;
@IsString()
location : string;
}

