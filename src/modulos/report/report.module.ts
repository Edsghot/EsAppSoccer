import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from 'src/ENTITY/Report.entity';
import { AreaEntity } from 'src/ENTITY/Area.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ReportEntity]),TypeOrmModule.forFeature([AreaEntity])],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
