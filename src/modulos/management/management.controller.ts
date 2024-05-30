import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementDto } from 'src/DTO/Management/Management.dto';

@Controller('api/management')
export class ManagementController {
    constructor(private readonly managemenService: ManagementService) { }

    @Post('/insert')
    async insertManagement(@Body() managemetDto: ManagementDto) {
        return await this.managemenService.createManagement(managemetDto);
    }

    @Get()
    async getAllManagements() {
        return await this.managemenService.getAllManagements();
    }

    @Get(':id')
    async getManagementById(@Param('id')id:number){
        return await this.managemenService.getManagementById(id);
    }

    @Delete(':id')
    async deleteManagement(@Param('id') id: number){
        return await this.managemenService.deleteManagement(id);
    }

    @Put('/update/:id')
    async updateArea(@Param('id') id: number,@Body() managementDto: ManagementDto){
        return await this.managemenService.updateManagement(id,managementDto);
    }
}
