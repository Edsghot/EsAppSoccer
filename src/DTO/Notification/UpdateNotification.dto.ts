import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateNotificationDto{
    @IsString()
    @IsNotEmpty()
    Message:string;
    
    IdManagement:number
}