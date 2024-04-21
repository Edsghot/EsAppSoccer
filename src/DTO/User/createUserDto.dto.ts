import { IsString, IsNotEmpty, IsNumber } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    EmployeeCode: string;

    @IsString()
    @IsNotEmpty()
    Area: string;

    @IsString()
    @IsNotEmpty()
    Shift: string;

    @IsString()
    @IsNotEmpty()
    PhoneNumber: string;

    @IsString()
    @IsNotEmpty()
    Mail: string;

    @IsNumber()
    Rol: number;
}