import { IsDate } from "class-validator";

export class CreateRendezVousDto {

    @IsDate()
    date:Date;

}
