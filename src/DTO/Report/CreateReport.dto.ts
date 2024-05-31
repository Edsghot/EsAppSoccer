import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReportDto{
    @IsString()
    @IsNotEmpty()
    Description:string;
    @IsString()
    @IsNotEmpty()
    NamePlayer:string;
    @IsNumber()
    @IsNotEmpty()
    IdArea:number;
}