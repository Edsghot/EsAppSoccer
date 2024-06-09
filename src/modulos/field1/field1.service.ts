import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';
import { CreateField2Dto } from 'src/DTO/Field2/CreateField2Dto.dto';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { Field1Entity } from 'src/ENTITY/Field1.entity';
import { UserEntity } from 'src/ENTITY/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Field1Service {
  constructor(
    @InjectRepository(Field1Entity)
    private readonly fieldRepository: Repository<Field1Entity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>
  ) {}
  async CreateField1(request: CreateField2Dto) {
    try {
      let newF = new Field1Entity();
      const user = await this.userRepository.findOne({
        where: { IdUser: request.IdUser },
      });
      if (!user) {
        return { msg: 'no se encontro el usuario', success: false };
      }



      newF.User = user;
      newF.StartTime = request.StartTime;
      newF.EndTime = request.EndTime;
      newF.DateDay = request.DateDay;
      newF.DateRegister=new Date();
      newF.ListPlayer = request.ListPlayer;

      const field = await this.fieldRepository.create(newF);

      await this.fieldRepository.save(field);

      return { msg: 'se inserto correctamente', success: true };
    } catch (error) {
      console.error('Failed to insert user:', error);
      return { msg: 'Error al insertar', detailMsg: error, success: false };
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

  async getById(id: number) {
    try {
      const field = await this.fieldRepository.query("select * from Field1 inner join User on Field1.userIdUser = User.IdUser inner join Area on User.areaIdArea = Area.IdArea INNER join Management on Area.managementIdManagement = Management.IdManagement where Field1.IdField1Entity = "+id);

      return { data: field[0], msg: 'Success', success: true }
    } catch (e) {
      console.error('Failed to get area by ID:', e);
      return { msg: 'Failed to get area', detailMsg: e, success: false };
    }
  }

  async getFieldById(id: number) {
    try {
      const field = await this.fieldRepository.findOne({
        where: { IdField1Entity: id },
      });
      if (!field) {
        return { msg: 'Field not found', success: false };
      }
      return { data: field, msg: 'Success', success: true };
    } catch (error) {
      console.error('Failed to get field by ID:', error);
      return { msg: 'Failed to get field', detailMsg: error, success: false };
    }
  }

  async deleteField(id: number) {
    try {
      const fieldToDelete = await this.fieldRepository.findOne({
        where: { IdField1Entity: id },
      });
      if (!fieldToDelete) {
        return { msg: 'Field not found', success: false };
      }
      var user = fieldToDelete.User;

      var area = await this.areaRepository.findOne({where:{User:user}});

      await this.fieldRepository.remove(fieldToDelete);
      return {IdArea: area.IdArea, msg: 'Field deleted successfully', success: true };

    } catch (error) {
      console.error('Failed to delete field:', error);
      return {
        msg: 'Failed to delete field',
        detailMsg: error,
        success: false,
      };
    }
  }

  async GetAllTotal() {
    try {
      const data = await this.fieldRepository.query('CALL GetAllField1();');
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

  async getAllWeekly(request: WeeklyDto) {
    try {
      const data = await this.fieldRepository.query(
        `CALL getAllWeekly('${request.StartDate}', '${request.EndDate}')`,
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

  async getField1ByDateRange(request: WeeklyDto) {
    try {
      const data = await this.fieldRepository
        .createQueryBuilder('field1')
        .where('field1.dateDay BETWEEN :startDate AND :endDate', {
          startDate: request.StartDate,
          endDate: request.EndDate,
        })
        .getMany();

      return {
        msg: 'Lista de reservas completa',
        data: data,
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
