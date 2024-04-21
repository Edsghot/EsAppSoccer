import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { CreateUserDto } from 'src/DTO/User/createUserDto.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';
import { UserEntity } from 'src/ENTITY/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async insertUser(createUserDto: CreateUserDto) {
        try {
          // Crear una nueva entidad de usuario utilizando los datos del DTO
          const newUser = this.userRepository.create({
            FirstName: createUserDto.FirstName,
            LastName: createUserDto.LastName,
            Password: (createUserDto.FirstName[0]).toUpperCase()+createUserDto.LastName[0].toUpperCase()+createUserDto.Dni,
            PhoneNumber: createUserDto.PhoneNumber,
            Dni: createUserDto.Dni,
            EmployeeCode: createUserDto.EmployeeCode,
            Area: createUserDto.Area,
            Shift: createUserDto.Shift,
            Mail: createUserDto.Mail,
            Rol: createUserDto.Rol,
            Laboratory: createUserDto.Laboratory
          });
    
          // Guardar la nueva entidad de usuario en la base de datos
          await this.userRepository.save(newUser);
    
          return { msg: 'User inserted successfully', success: true };
        } catch (error) {
          console.error('Failed to insert user:', error);
          return { msg: 'Failed to insert user', detailMsg: error, success: false };
        }
      }
    async updateUser(updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findOne({where:{IdUser: updateUserDto.IdUser}});
            if (!user) {
                return { msg: 'User not found', success: false };
            }
    
            user.FirstName = updateUserDto.FirstName;
            user.LastName = updateUserDto.LastName;
            user.Password = updateUserDto.Password;
            user.PhoneNumber = updateUserDto.PhoneNumber;
            user.Dni = updateUserDto.Dni;
            user.EmployeeCode = updateUserDto.EmployeeCode;
            user.Area = updateUserDto.Area;
            user.Shift = updateUserDto.Shift;
            user.Mail = updateUserDto.Mail;
            user.Rol = updateUserDto.Rol;
    
            await this.userRepository.save(user);
    
            return { msg: 'User updated successfully', success: true };
        } catch (error) {

            return { msg: 'Failed to update user', detailMsg: error, success: false };
        }
    }
    
    

    async getAllUsers() {
        try {
            const users = await this.userRepository.find();
            return { data: users, msg: 'Success', success: true };
        } catch (error) {
            console.error('Failed to get users:', error);
            return { msg: 'Failed to get users', detailMsg: error, success: false };
        }
    }

    async deleteUser(userId: number) {
        try {
            await this.userRepository.delete(userId);
            return { msg: 'User deleted successfully', success: true };
        } catch (error) {
            console.error('Failed to delete user:', error);
            return { msg: 'Failed to delete user', detailMsg: error, success: false };
        }
    }

    async getUserById(userId: number) {
        try {
            const user = await this.userRepository.findOne({ where: { IdUser: userId } });
            return { data: user, msg: 'Success', success: true };
        } catch (error) {
            console.error('Failed to get user by ID:', error);
            return { msg: 'Failed to get user', detailMsg: error, success: false };
        }
    }

    async login(userRequest: string, password: string) {
        try {

            let userRes;
            userRes = await this.userRepository.findOne({ where: { Dni: userRequest,Password:password } });
            
            if (!userRes ) {
                userRes = await this.userRepository.findOne({ where: { EmployeeCode: userRequest,Password:password } });
                
                if (!userRes ) {
                    return { data: null, msg: 'Invalid username or password', success: false };
                }
            }
            
            return { data: userRes, msg: 'Success', success: true };

        } catch (error) {
            return { msg: 'Login failed', detailMsg: error, success: false };
        }
    }

}
