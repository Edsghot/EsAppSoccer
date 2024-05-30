import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto{
    @IsString()
    @IsNotEmpty()
    Message:string;
    @IsNumber()
    @IsNotEmpty()
    IdManagement:number
}