import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';
import { CreateField2Dto } from 'src/DTO/Field2/CreateField2Dto.dto';
import { DeleteField2Dto } from 'src/DTO/Field2/DeleteField2Dto.dto';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { BookingEntity } from 'src/ENTITY/Booking.entity';
import { Field2Entity } from 'src/ENTITY/Field2.entity';
import { UserEntity } from 'src/ENTITY/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Field2Service {
  constructor(
    @InjectRepository(Field2Entity)
    private readonly fieldRepository: Repository<Field2Entity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingEntity: Repository<BookingEntity>,
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>
  ) { }

  async CreateField2(request: CreateField2Dto) {
    try {
      let newF = new Field2Entity();
      let ultField = 1;
      const user = (await this.userRepository.query("select * from User Where IdUser = "+request.IdUser))[0];

      if (!user) {
        return { msg: 'no se encontro el usuario', success: false };
      }

      const ultField2 = await this.fieldRepository
    .createQueryBuilder("field2")
    .orderBy("field2.DateRegister", "DESC")
    .getOne();

    if(ultField2){
      ultField = ultField2.IdField2Entity + 1;
  }
    

      newF.User = user;
      newF.StartTime = request.StartTime;
      newF.EndTime = request.EndTime;
      newF.ListPlayer = request.ListPlayer;
      newF.DateDay = request.DateDay;
      newF.DateRegister=moment.tz('America/Lima').toDate();;

      if (user.Rol != 4) {

        var nameArea = (await this.areaRepository.findOne({where:{IdArea:user.areaIdArea}})).NameArea
        if(!nameArea){
           return { msg: "error con el area", success: false }
        }

        const contadorDia = await this.getFieldCountByDateAndArea(request.DateDay, nameArea, user.Shift);

        if (contadorDia > 0) {
          return { msg: "El area de " + nameArea.toUpperCase() + " ya se registro para este dia", success: false }
        }

        const DateWeekend = request.StartWeekend + "-" + request.EndWeekend;
        const contadorSemana = await this.GetFieldByDateWeekend(DateWeekend, nameArea,user.Shift,ultField);

        if (contadorSemana > 2) {
          return { msg: "El area de " + nameArea.toUpperCase() + " ya supero el limite de registro de esta semana", success: false }
        }

        const field = await this.fieldRepository.create(newF);

      await this.fieldRepository.save(field);

      return { msg: 'se inserto correctamente', success: true };
      }

      const field = await this.fieldRepository.create(newF);

      await this.fieldRepository.save(field);

      return { msg: 'se inserto correctamente', success: true };
    } catch (error) {
      console.error('Failed to insert user:', error);
      return { msg: 'Error al insertar ' +error, detailMsg: error, success: false };
    }
  }
  async getAllFields() {
    try {
      const fields = await this.fieldRepository.find();
      return { data: fields, msg: 'Success', success: true };
    } catch (error) {
      console.error('Failed to get fields:', error);
      return { msg: 'Failed to get fields', detailMsg: error, success: false };
    }
  }

  async getFieldById(id: number) {
    try {
      const field = await this.fieldRepository.findOne({
        where: { IdField2Entity: id },
      });
      if (!field) {
        return { msg: 'Field not found', success: false };
      }
      return { data: field, msg: 'Success', success: true };
    } catch (error) {
      console.error('Failed to get field by ID:', error);
      return { msg: 'Failed to get field', detailMsg: error, successShift: "Noche"
    }
  }
}

  async deleteField(request:DeleteField2Dto) {
    try {
      const fieldToDelete = await this.fieldRepository.findOne({
        where: { IdField2Entity: request.IdField },
        relations: ['User'],
      });
      
      if (!fieldToDelete) {
        return { msg: 'Field not found', success: false };
      }

      if(request.Rol !== 1){

      var bookin = await this.bookingEntity.findOne({where:{Shift: request.Shift,Area: request.Area,DateWeekend:request.DateWeekendRange}});

      if(!bookin){
        return {msg:"Error en booking, llame al tecnico", }
      }

      if(bookin.Quantity > 1){
        bookin.Quantity = 1;
        await this.bookingEntity.save(bookin);
      }else{
        await this.bookingEntity.remove(bookin);
      }
    }

      var user = fieldToDelete.User;

      var area = await this.areaRepository.findOne({where:{User:user}});
      await this.fieldRepository.remove(fieldToDelete);
      return {IdArea: area.IdArea, msg: 'Field deleted successfully', success: true };

    } catch (error) {
      console.error('Failed to delete field:', error);
      return {
        msg: 'Failed to delete field',
        detailMsg: error.message,
        success: false,
      };
    }
  }

  async GetAllTotal() {
    try {
      const data = await this.fieldRepository.query('CALL GetAllField2()');
      return {
        msg: 'Lista de reservas completa',
        data: data[0],
        success: true,
      };
    } catch (error) {
      console.error('Failed to fetch all fields:', error);
      return {
        msg: 'Failed to fetch all fields',
        detailMsg: error,
        success: false,
      };
    }
  }

  async getById(id: number) {
    try {
      const field = await this.fieldRepository.query(
        `SELECT * FROM Field2 
         INNER JOIN User ON Field2.userIdUser = User.IdUser 
         INNER JOIN Area ON User.areaIdArea = Area.idArea 
         INNER JOIN Management ON Area.managementIdManagement = Management.idManagement 
         WHERE Field2.IdField2Entity = ?`,
        [id]
      );

      return { data: field[0], msg: 'Success', success: true };
    } catch (e) {
      console.error('Failed to get area by ID:', e);
      return { msg: 'Failed to get area', detailMsg: e.message, success: false };
    }
  }

  async getAllWeekly(request: WeeklyDto) {
    try {
      const data = await this.fieldRepository.query(
        `CALL getAllWeekly2('${request.StartDate}', '${request.EndDate}')`,
      );
      return {
        msg: 'Lista de reservas completa',
        data: data[0],
        success: true,
      };
    } catch (error) {
      console.error('Failed to fetch all fields:', error);
      return {
        msg: 'Failed to fetch all fields',
        detailMsg: error,
        success: false,
      };
    }
  }

  async getFieldCountByDateAndArea(dateDay: string, area: string, turno: string): Promise<number> {
    try {
      const data = await this.fieldRepository.query(
        `CALL GetFieldCountByDateAndArea('${dateDay}', '${area}', '${turno}')`,
      );
      const contador = parseInt(data[0][0].contador);
      return isNaN(contador) ? 0 : contador;
    } catch (error) {
      return 2;
    }
  }

async GetFieldByDateWeekend(DateWeekend: string,area:string,shift:string,IdField:number): Promise<number> {
  try {
    
    const validate = await this.bookingEntity.findOne({where: {DateWeekend:DateWeekend,Area:area,Shift:shift}});
    if(!validate){
        var newBooking = new BookingEntity();
        newBooking.DateWeekend = DateWeekend
        newBooking.Quantity = 1;
        newBooking.Area = area;
        newBooking.Shift = shift;
        newBooking.IdField = IdField;

        const booking = await this.bookingEntity.create(newBooking);
        await this.bookingEntity.save(booking);
        return 1;
      }else if(validate.Quantity>2){
        return 5;
      }
       else {
        validate.Quantity = validate.Quantity + 1;
        await this.bookingEntity.save(validate);
        return validate.Quantity;
      }
    } catch (error) {
      return 5;
    }
  }


  async getField2ByDateRange(request: WeeklyDto){
    try {
        const data = await this.fieldRepository
            .createQueryBuilder('field2')
            .innerJoinAndSelect('field2.User', 'user')
            .innerJoinAndSelect('user.Area', 'area')
            .where('field2.DateDay BETWEEN :startDate AND :endDate', {
                startDate: request.StartDate,
                endDate: request.EndDate,
            })
            .getMany();

        return {
            msg: 'Lista de reservas completa',
            data: data.map(field => ({
                IdField2Entity: field.IdField2Entity,
                StartTime: field.StartTime,
                EndTime: field.EndTime,
                DateDay: field.DateDay,
                DateRegister: field.DateRegister,
                ListPlayer: field.ListPlayer,
                User: {
                    IdUser: field.User.IdUser,
                    FirstName: field.User.FirstName,
                    LastName: field.User.LastName,
                    Password: field.User.Password,
                    Dni: field.User.Dni,
                    EmployeeCode: field.User.EmployeeCode,
                    Shift: field.User.Shift,
                    PhoneNumber: field.User.PhoneNumber,
                    Mail: field.User.Mail,
                    Rol: field.User.Rol,
                    Date: field.User.Date,
                    IndActive: field.User.IndActive,
                    NameArea: field.User.Area ? field.User.Area.NameArea : null,
                },
            })),
            success: true,
        };
    } catch (error) {
        console.error('Failed to fetch all fields:', error);
        return {
            msg: 'Failed to fetch all fields',
            detailMsg: error.message,
            success: false,
        };
    }
  }
}


