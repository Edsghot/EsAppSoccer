import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaDto } from 'src/DTO/Area/Area.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';

@Controller('api/area')
export class AreaController {
    constructor(private readonly areaService: AreaService) { }

    @Post('/insert')
    async insertArea(@Body() request: AreaDto) {
        return await this.areaService.CreateArea(request);
    }

    @Get()
    async getAllAreas() {
        return await this.areaService.getAllAreas();
    }

    @Get(':id')
    async getAreaById(@Param('id') id: number) {
        return await this.areaService.getAreaById(id);
    }

    @Delete(':id')
    async deleteArea(@Param('id') id: number){
        return await this.areaService.deleteArea(id);
    }

    @Put('update/:id')
    async updateArea(@Param('id') id: number,@Body() updateAreaDto:AreaDto){
        return await this.areaService.updateArea(updateAreaDto,id);
    }

    //@Put('/update')
    //async updateArea()
}
