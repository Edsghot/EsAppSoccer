import { Injectable  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/DTO/User/createUserDto.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';
import { UserEntity } from 'src/ENTITY/User.entity';
import { Repository } from 'typeorm';
import { ValidateService } from '../Validate/validate.service';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { ValidateEmailDto } from 'src/DTO/ValidateEmail/validateEmail.dto';
import { RecoverPasswordDto } from 'src/DTO/User/recoverPassword.dto';
import { ValidateEmailSmsEntity } from 'src/ENTITY/ValidateEmailSms.entity';
import * as bcrypt from 'bcrypt';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';
import { AuthValidateService } from '../auth-validate/auth-validate.service';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as moment from 'moment-timezone';

@Injectable()
export class UserService {
  code: number;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>,
    private validateService: ValidateService,
    private mailValidateService: AuthValidateService,
    @InjectRepository(ValidateEmailSmsEntity)
    private readonly validateRepository:Repository<ValidateEmailSmsEntity>
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

        const mail = await this.userRepository.findOne({where: {Mail:request.Mail}});

        if(mail){
          return {msg: "ya se registro un usuario con ese correo",sucess: false, data:null}
        }
    
      const area = await this.areaRepository.findOne({where:{IdArea:request.IdArea}})
      if(!area){
        return {msg:"No se encontro la Area",success: false,data: null};
      }

      var dat = moment.tz('America/Lima').toDate();
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
        Area: area, 
        Shift: request.Shift,
        Mail: request.Mail,
        Rol: request.Rol,
        Date: dat,
        IndActive: true
      });

      // Guardar la nueva entidad de usuario en la base de datos
      await this.userRepository.save(newUser);

      await this.mailValidateService.sendMailUser(request.Mail,request.Dni,newUser.Password);

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
      user.Shift = updateUserDto.Shift;
      user.Mail = updateUserDto.Mail;
      user.Rol = updateUserDto.Rol;

      await this.userRepository.save(user);
      

      return { msg: 'User updated successfully', success: true };
    } catch (error) {
      return { msg: 'Failed to update user', detailMsg: error, success: false };
    }
  }

  async blockUser(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { IdUser: id },
      });
      if (!user) {
        return { msg: 'Usuario no existe', success: false };
      }
      user.IndActive = false;
      await this.userRepository.save(user);

      return { msg: 'usuario '+user.FirstName+" bloqueado", success: true };
    } catch (error) {
      return { msg: 'Failed to update user', detailMsg: error, success: false };
    }
  }

  async unLock(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { IdUser: id },
      });
      if (!user) {
        return { msg: 'Usuario no existe', success: false };
      }
      user.IndActive = true;
      await this.userRepository.save(user);

      return { msg: 'Usuario '+user.FirstName+' desbloqueado', success: true };
    } catch (error) {
      return { msg: 'Failed to update user', detailMsg: error, success: false };
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.query("select User.*, Area.NameArea from User inner join Area on User.areaIdArea = Area.IdArea;");
    
      return { data: users, msg: 'Success', success: true };
    } catch (error) {
      console.error('Failed to get users:', error);
      return { msg: 'Failed to get users', detailMsg: error, success: false };
    }
  }

  async getUserByDni(dni: string) {
    const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;
    const token = this.configService.get<string>('RENIEC_API_TOKEN');

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        })
      );

      if (!response) {
        return { msg: "Error al consultar", data: null, success: false };
      }

      return { msg: "Datos del Dni", data: response.data, success: true };
    } catch (error) {
      throw new Error(`Error fetching data from RENIEC: ${error}`);
    }}
    
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
      const user = await this.userRepository.query('select * from User INNER join Area on User.areaIdArea = Area.IdArea INNER join Management on Area.managementIdManagement = Management.IdManagement where User.IdUser = '+userId);

      return { data: user[0], msg: 'Success', success: true };
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
            msg: 'Verifique su contraseña o usuario',
            success: false,
          };
        }
      }

      if(!userRes.IndActive){
        return {data: userRes, msg: 'Este usuario se encuentra bloqueado', success: false }
      }

      var user = await this.userRepository.query(`
      SELECT User.*, Area.NameArea
      FROM User
      INNER JOIN Area ON User.areaIdArea = Area.IdArea
      WHERE User.IdUser = ?
    `, [userRes.IdUser]);
      return { data:user[0], msg: 'Success', success: true };
    } catch (error) {
      return { msg: 'Login failed', detailMsg: error, success: false };
    }
  }

  async validateCode(data: ValidateEmailDto) {
    const { Email, Code } = data;

    var existing = await this.validateRepository.findOne({
      where: { Email },
    });

    if (existing === null) {
      return { msg: 'Error en validar el codigo', value: false };
    }

    if (existing.Code === Code) {
      return { msg: 'Esta correcto', value: true };
    }

    return { msg: 'Error al validar código', value: false };
  }

  async recoverPassword(update: RecoverPasswordDto) {
    var n = await this.userRepository.findOne({
      where: { Mail: update.Email },
    });

    if (n === null) {
      return {
        msg: 'No se encontro el usuario',
        value: false,
      };
    }

    if (!update.Password) {
      return {
        msg: 'Su nueva contraseña no tiene caracteres',
        value: false,
      };
    }

    try {
      const hashPassword = await bcrypt.hash(update.Password, 10);

      n.Password = hashPassword;

      await this.userRepository.save(n);

      return {
        msg: 'se actualizo correctamente',
      };
    } catch (e) {
      return {
        msg: 'Error al recuperar la contraseña',
      };
    }
  }

  async getUserByDateRange(request: WeeklyDto) {
    try {
      const data = await this.userRepository.query(
        `SELECT * FROM User 
         INNER JOIN Area ON User.areaIdArea = Area.idArea 
         INNER JOIN Management ON Area.managementIdManagement = Management.idManagement 
         WHERE User.date BETWEEN ? AND ?`,
        [request.StartDate, request.EndDate]
      );
  
      return {
        msg: 'Lista de reservas completa',
        data: data,
        success: true,
      };
    } catch (error) {
      console.error('Failed to fetch all users:', error);
      return {
        msg: 'Failed to fetch all users',
        detailMsg: error.message,
        success: false,
      };
    }
  }
}
