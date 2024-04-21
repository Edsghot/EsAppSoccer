import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsNumber()
    IdUser: number;

    @IsString()
    @IsNotEmpty()
    FirstName: string;

    @IsString()
    @IsNotEmpty()
    LastName: string;

    @IsString()
    @IsNotEmpty()
    Password: string;

    @IsString()
    @IsNotEmpty()
    PhoneNumber: string;

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
    Mail: string;

    @IsNumber()
    Rol: number;
}