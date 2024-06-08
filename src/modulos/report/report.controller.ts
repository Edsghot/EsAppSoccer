import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from 'src/DTO/Report/CreateReport.dto';
import { UpdateReportDto } from 'src/DTO/Report/UpdateReport.dto';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';

@Controller('api/report')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post('/insert')
    async insertReport(@Body() createReportDto: CreateReportDto) {
        return await this.reportService.CreateReport(createReportDto);
    }

    @Get()
    async getAllReports() {
        return this.reportService.getAllReports();
    }

    @Get('/getById/:id')
    async getReportById(@Param('id') id: number) {
        return this.reportService.getReportById(id);
    }

    @Get('/getByDay')
    async getReportByDay(@Body()dateDay:string){
        return this.reportService.getReportByDay(dateDay);
    }

    @Delete(':id')
    async deleteReport(@Param('id') id: number) {
        return this.reportService.deleteReport(id);
    }

    @Put('/update/:id')
    async updateReport(@Param('id') id: number, @Body() updateReportDto: UpdateReportDto) {
        return await this.reportService.updateReport(id, updateReportDto);
    }

    @Post('/report/')
    async getReportsBetweenDates(@Body() request: WeeklyDto) {
        return this.reportService.getReportsBetweenDates(request);
    }



    
}
