import { Body, Controller, Post } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from 'src/DTO/Area/CreateArea.dto';

@Controller('api/area')
export class AreaController {
    constructor(private readonly areaService: AreaService ){}

    @Post('/insert')
    async insertArea(@Body() request: CreateAreaDto){
        return await this.areaService.CreateArea(request); 
    }

    //@Put('/update')
    //async updateArea()
}
