import { IsBoolean, isBoolean, isNumber, IsNumber, IsOptional, isString, IsString } from "class-validator";
import { genderEnum } from "src/enums/gender.enum";

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
@IsOptional()
photoUrl?: string;
@IsString()
ville : string;
@IsNumber()
codePostal : number;
@IsString()
location : string;
@IsString() 
gender: genderEnum;
@IsBoolean()
ableToTravel: boolean;
@IsNumber()
age: number;
}

