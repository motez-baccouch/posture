import { IsDate, IsEmail, isNumber, IsNumber, IsString } from "class-validator";

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
photo?: string;
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
}
