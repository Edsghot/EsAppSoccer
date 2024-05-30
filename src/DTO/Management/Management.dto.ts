import { IsNotEmpty, IsString } from "class-validator";

export class ManagementDto{
    @IsString()
    @IsNotEmpty()
    NameManagement:string;
}