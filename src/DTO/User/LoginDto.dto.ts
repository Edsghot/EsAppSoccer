import { IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    UserRequest: string;

    @IsString()
    @IsNotEmpty()
    Password: string;
}