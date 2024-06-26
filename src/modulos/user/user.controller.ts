import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/DTO/User/createUserDto.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';
import { UserService } from './user.service';
import { LoginDto } from 'src/DTO/User/LoginDto.dto';
import { validate } from 'class-validator';
import { ValidateEmailDto } from 'src/DTO/ValidateEmail/validateEmail.dto';
import { RecoverPasswordDto } from 'src/DTO/User/recoverPassword.dto';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('insert')
    async insertUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.insertUser(createUserDto);
    }

    @Put('update')
    async updateUser(@Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(updateUserDto);
    }

    @Put('blockUser/:id')
    async blockUser(@Param("id") id:number) {
        return await this.userService.blockUser(id);
    }

    @Put('unLockUser/:id')
    async unLock(@Param("id") id:number) {
        return await this.userService.unLock(id);
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get('/Reniec/:dni')
    async getByDni(@Param('dni')dni:string){
        return await this.userService.getUserByDni(dni);
    }

    @Get('/getById/:id')
    async getUserById(@Param('id') id: number) {
        return await this.userService.getUserById(id);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // Valida la instancia del DTO
        const errors = await validate(loginDto);
    
        // Si hay errores de validación, lanza un error con los detalles
        if (errors.length > 0) {
            const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
        
            return {msg: "Error de datos de ingreso", detailMsg:errorMessage }
        }
    
        // Si la validación es exitosa, procede con la lógica de inicio de sesión
        return await this.userService.login(loginDto.UserRequest, loginDto.Password);
    }

    @Post('validate')
    async validateCode(@Body() data: ValidateEmailDto) {
        var res = await this.userService.validateCode(data);
        return res;
    }

    @Put('recoverPassword')
    async recoverPassword(@Body() update: RecoverPasswordDto) {
        return await this.userService.recoverPassword(update);
    }

    @Post("/GetUserByDateRange")
    async GetUserByDateRange(@Body() request: WeeklyDto) {
      return await this.userService.getUserByDateRange(request);
    }
}
