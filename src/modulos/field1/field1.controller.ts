import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateField2Dto } from 'src/DTO/Field2/CreateField2Dto.dto';
import { Field1Service } from './field1.service';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';

@Controller('api/field1')
export class Field1Controller {
    constructor(private readonly fieldsService: Field1Service) {}

    @Post()
    async createField(@Body() createFieldDto: CreateField2Dto) {
      return await this.fieldsService.CreateField1(createFieldDto);
    }
  
    @Get()
    async getAllFields() {
      return await this.fieldsService.getAllFields();
    }
  
    @Get(':id')
    async getFieldById(@Param('id') id: number) {
      return await this.fieldsService.getFieldById(id);
    }
  
    @Delete(':id')
    async deleteField(@Param('id') id: number) {
      return await this.fieldsService.deleteField(id);
    }

    @Get("/GetAllTotal")
    async GetAllTotal() {
      return await this.fieldsService.GetAllTotal();
    }

    @Get("/GetAllWeekly")
    async GetAllWeekly(@Body() request: WeeklyDto) {
      return await this.fieldsService.getAllWeekly(request);
    }
}
