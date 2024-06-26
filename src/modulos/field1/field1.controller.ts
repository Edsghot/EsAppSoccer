import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
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

    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
      return await this.fieldsService.getById(id);
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
    async GetAllWeekly(@Query() request: WeeklyDto) {
      return await this.fieldsService.getAllWeekly(request);
    }

    @Post("/GetField1ByDateRange")
    async GetField1ByDateRange(@Body() request: WeeklyDto) {
      return await this.fieldsService.getField1ByDateRange(request);
    }

}
