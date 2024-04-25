import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateField2Dto } from 'src/DTO/Field2/CreateField2Dto.dto';
import { Field2Service } from './field2.service';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';

@Controller('api/field2')
export class Field2Controller {
    constructor(private readonly fieldsService: Field2Service) {}

    @Post()
    async createField(@Body() createFieldDto: CreateField2Dto) {
      return await this.fieldsService.CreateField2(createFieldDto);
    }
  
    @Get()
    async getAllFields() {
      return await this.fieldsService.getAllFields();
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

    @Get("/test")
    async test(){
      return await this.fieldsService.getFieldCountByDateAndArea("2024-04-27","Marketing")
    }
}
