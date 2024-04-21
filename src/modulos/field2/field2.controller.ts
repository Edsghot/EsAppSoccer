import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateField2Dto } from 'src/DTO/Field2/CreateField2Dto.dto';
import { Field2Service } from './field2.service';

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
  
    @Get(':id')
    async getFieldById(@Param('id') id: number) {
      return await this.fieldsService.getFieldById(id);
    }
  
    @Delete(':id')
    async deleteField(@Param('id') id: number) {
      return await this.fieldsService.deleteField(id);
    }
}
