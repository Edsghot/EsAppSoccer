import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from "class-validator";

export class CreateAreaDto{
    @IsString()
    @IsNotEmpty()
    NameArea: string;
    @IsNumber()
    @IsNotEmpty()
    IdManagement:number
}