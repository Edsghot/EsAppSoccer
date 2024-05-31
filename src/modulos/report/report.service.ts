import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAreaDto } from 'src/DTO/Area/CreateArea.dto';
import { CreateReportDto } from 'src/DTO/Report/CreateReport.dto';
import { UpdateReportDto } from 'src/DTO/Report/UpdateReport.dto';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { ReportEntity } from 'src/ENTITY/Report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(ReportEntity) private readonly reportRepository: Repository<ReportEntity>,
        @InjectRepository(AreaEntity) private readonly areaRepository: Repository<AreaEntity>) { }

    async CreateReport(createReportDto: CreateReportDto) {
        try {
            var newReport = new ReportEntity();
            const area = await this.areaRepository.findOne({
                where: { IdArea: createReportDto.IdArea }
            });
            if (!area) {
                return { msg: "No se encontro el area", success: false }
            }
            newReport.Area = area;
            newReport.Description = createReportDto.Description;
            newReport.Date
            var fec = new Date();
            var Create = await this.reportRepository.create(newReport);
            await this.reportRepository.save(Create);
            return { msg: "Se inserto correctamente", success: true }
        } catch (e) {
            console.error("Error: ", e);
            return { msg: "Error no se pudo insertar", success: false, detailMsg: e }
        }
    }

    async getAllReports() {
        try {
            const report = await this.reportRepository.find();
            return { data: report, msg: "Success", success: true };
        } catch (e) {
            console.error('Failed to get report:', e);
            return { msg: 'Failed to get report:', success: false, detailMsg: e }
        }
    }
    async getReportById(reportId: number) {
        try {
            const report = await this.reportRepository.findOne({
                where: { IdReport: reportId }
            });
            if (!report) {
                return { msg: "El reporte no existe", success: false }
            }
            return { data: report, msg: "Success", success: true }
        } catch (e) {
            console.error('Failed to get report by ID:', e);
            return { msg: 'Failed to get repot', detailMsg: e, success: false };
        }
    }

    async getReportByDay(date: Date) {
        
        try {
            const report = await this.reportRepository.find({
                where: { Date: date }
            });
            if (!report) {
                return { msg: "El reporte no existe por ese dia", success: false }
            }
            return { data: report, msg: "Success", success: true }
        } catch (e) {
            console.error('Failed to get report by day:', e);
            return { msg: 'Failed to get repot by day', detailMsg: e, success: false };
        }
    }
    async deleteReport(reportId: number) {
        try {
            const report = await this.reportRepository.findOne({
                where: { IdReport: reportId }
            });
            if (!report) {
                return { msg: "El reporte no existe", success: false }
            }
            await this.reportRepository.delete(reportId);
            return { msg: 'Se elimino correctament el reporte', success: true };
        } catch (e) {
            console.error('Failed to delete report:', e);
            return { msg: 'Failed to delete report', detailMsg: e, success: false };
        }
    }

    async updateReport(reportId: number, updateReportDto: UpdateReportDto) {
        try {
            const report = await this.reportRepository.findOne({
                where: { IdReport: reportId }
            });
            if (!report) {
                return { msg: 'No se encontro el reporte', success: false }
            }
            if (updateReportDto.IdArea) {
                const area = await this.areaRepository.findOne({
                    where: { IdArea: updateReportDto.IdArea }
                });
                report.Area = area;
            }
            report.Description = updateReportDto.Description
            await this.reportRepository.save(report);
            return { msg: 'Se actualizo correctamente el reporte', success: true };
        } catch (e) {
            console.error('Failed to update report:', e);
            return { msg: 'Failed to update report', detailMsg: e, success: false };
        }
    }

}

