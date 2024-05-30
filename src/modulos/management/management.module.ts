import { Module } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagementEntity } from 'src/ENTITY/Management.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ManagementEntity])],
  providers: [ManagementService],
  controllers: [ManagementController]
})
export class ManagementModule {}
