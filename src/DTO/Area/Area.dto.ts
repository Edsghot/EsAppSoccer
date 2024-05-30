import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AreaDto{
    @IsString()
    @IsNotEmpty()
    NameArea: string;
    @IsNotEmpty()
    @IsNumber()
    IdManagement:number
}