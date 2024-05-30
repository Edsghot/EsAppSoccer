import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { ManagementEntity } from 'src/ENTITY/Management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity]),TypeOrmModule.forFeature([ManagementEntity])],
  providers: [AreaService],
  controllers: [AreaController]
})
export class AreaModule {}
