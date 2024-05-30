import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAreaDto{
    @IsString()
    @IsNotEmpty()
    NameArea: string;
    
    IdManagement:number
}