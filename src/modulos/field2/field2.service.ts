import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateField2Dto } from 'src/DTO/Field2/CreateField2Dto.dto';
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
  ) {}

  async CreateField2(request: CreateField2Dto) {
    try {
      let newF = new Field2Entity();
      const user = await this.userRepository.findOne({where:{IdUser: request.IdUser}})
      if(!user){
          return {msg:"no se encontro el usuario",success: false}
      }
      newF.User = user;
      newF.startTime = request.StartTime;
      newF.endTime = request.EndTime;
      newF.date = new Date();

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
  
  async getFieldById(id: number) {
    try {
      const field = await this.fieldRepository.findOne({where:{IdField2Entity:id}});
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
      const fieldToDelete = await this.fieldRepository.findOne({where:{IdField2Entity:id}});
      if (!fieldToDelete) {
        return { msg: 'Field not found', success: false };
      }
      await this.fieldRepository.remove(fieldToDelete);
      return { msg: 'Field deleted successfully', success: true };
    } catch (error) {
      console.error('Failed to delete field:', error);
      return { msg: 'Failed to delete field', detailMsg: error, success: false };
    }
  }
  

}
