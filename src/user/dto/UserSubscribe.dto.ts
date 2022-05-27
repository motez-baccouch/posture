import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSubscribeDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}