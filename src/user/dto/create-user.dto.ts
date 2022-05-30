import { IsDate, IsEmail, isNumber, IsNumber, IsString , IsBoolean} from "class-validator";
import { Roles } from "src/enums/roles.enum";

export class CreateUserDto {
@IsString() 
prenom : string ;
@IsString() 
password : string ;
@IsEmail()
email : string;
@IsNumber()
numero : number;
@IsNumber()
age : number ; 
@IsString() 
photoUrl?: string;
/* @IsDate() 
anniversaire: Date; */
@IsString() 
ville : string;
@IsNumber() 
codePostal : number;
@IsString() 
location : string;
@IsString() 
sexe : string;
@IsString()
role : Roles;
@IsBoolean()
ableToTravel : boolean;
}
