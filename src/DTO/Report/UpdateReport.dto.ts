import { IsNotEmpty, IsString } from "class-validator";

export class UpdateReportDto{
    @IsString()
    @IsNotEmpty()
    Description:string;
    NamePlayer:string;
    IdArea:number;
}