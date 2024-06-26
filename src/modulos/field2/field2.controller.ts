import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateField2Dto } from 'src/DTO/Field2/CreateField2Dto.dto';
import { Field2Service } from './field2.service';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';
import { DeleteField2Dto } from 'src/DTO/Field2/DeleteField2Dto.dto';

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

    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
      return await this.fieldsService.getById(id);
    }
  
    @Delete('/deleteField/')
    async deleteField(@Body() request: DeleteField2Dto) {
      return await this.fieldsService.deleteField(request);
    }

    @Get("/GetAllTotal")
    async GetAllTotal() {
      return await this.fieldsService.GetAllTotal();
    }

    @Get("/GetAllWeekly")
    async GetAllWeekly(@Query() request: WeeklyDto) {
      return await this.fieldsService.getAllWeekly(request);
    }

    @Get('/test')
    async test() {
        const Date = "2024-04-22-2024-04-28"// área de prueba

        return await this.fieldsService.GetFieldByDateWeekend(Date,"Recursos","night",3);
    }

    @Post("/GetField2ByDateRange")
    async GetField2ByDateRange(@Body() request: WeeklyDto) {
      return await this.fieldsService.getField2ByDateRange(request);
    }
}
