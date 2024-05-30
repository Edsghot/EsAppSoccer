import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from 'src/ENTITY/Report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(ReportEntity) private readonly reportRepository:Repository<ReportEntity>){}
}
