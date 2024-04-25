import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { CreateUserDto } from 'src/DTO/User/createUserDto.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';
import { UserEntity } from 'src/ENTITY/User.entity';
import { Repository } from 'typeorm';
import { ValidateService } from '../Validate/validate.service';

@Injectable()
export class UserService {
  code: number;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private validateService: ValidateService,
  ) {
    this.code = 0;
  }

  async insertUser(request: CreateUserDto) {
    try {
        let band: { success: boolean, msg: string };
        band = await this.validateService.validateDni(request.Dni);
        
        if(!band.success){
            return {msg: band.msg,success: band.success, data:null}
        }
        band = await this.validateService.validatePhoneNumber(request.PhoneNumber);
        
        if(!band.success){
            return {msg: band.msg,success: band.success, data:null}
        }
        band = await this.validateService.validateFirstName(request.FirstName);
        
        if(!band.success){
            return {msg: band.msg,success: band.success, data:null}
        }
        band = await this.validateService.validateLastName(request.LastName);

        if(!band.success){
            return {msg: band.msg,success: band.success, data:null}
        }

        const userDni = await this.userRepository.findOne({where: {Dni: request.Dni}})

        if(userDni){
            return {msg: "ya se registro un usuario con ese Dni",success: false, data:null}
        }
      const newUser = this.userRepository.create({
        FirstName: request.FirstName,
        LastName: request.LastName,
        Password:
          request.FirstName[0].toUpperCase() +
          request.LastName[0].toUpperCase() +
          request.Dni,
        PhoneNumber: request.PhoneNumber,
        Dni: request.Dni,
        EmployeeCode: 'AS' + this.code++,
        Area: request.Area,
        Shift: request.Shift,
        Mail: request.Mail,
        Rol: request.Rol,
        Laboratory: request.Laboratory,
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
      const user = await this.userRepository.findOne({
        where: { IdUser: updateUserDto.IdUser },
      });
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
      const user = await this.userRepository.findOne({
        where: { IdUser: userId },
      });
      return { data: user, msg: 'Success', success: true };
    } catch (error) {
      console.error('Failed to get user by ID:', error);
      return { msg: 'Failed to get user', detailMsg: error, success: false };
    }
  }

  async login(userRequest: string, password: string) {
    try {
      let userRes;
      userRes = await this.userRepository.findOne({
        where: { Dni: userRequest, Password: password },
      });

      if (!userRes) {
        userRes = await this.userRepository.findOne({
          where: { EmployeeCode: userRequest, Password: password },
        });

        if (!userRes) {
          return {
            data: null,
            msg: 'Invalid username or password',
            success: false,
          };
        }
      }

      return { data: userRes, msg: 'Success', success: true };
    } catch (error) {
      return { msg: 'Login failed', detailMsg: error, success: false };
    }
  }
}
