import { IsString, IsNotEmpty, IsNumber, IsEmail } from "class-validator";

// create-user.dto.ts
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    FirstName: string;

    @IsString()
    @IsNotEmpty()
    LastName: string;

    @IsString()
    @IsNotEmpty()
    Dni: string;

    @IsNotEmpty()
    IdArea: number;

    @IsString()
    @IsNotEmpty()
    Shift: string;

    @IsString()
    @IsNotEmpty()
    PhoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    Mail: string;

    @IsNumber()
    Rol: number;
}