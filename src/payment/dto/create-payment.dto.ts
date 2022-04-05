import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreatePaymentDto {
    @IsNotEmpty()
    @IsString()
    Address: string;
    @IsNotEmpty()
    @IsNumber()
    NumeroTelephone: number;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    type: string;
}
