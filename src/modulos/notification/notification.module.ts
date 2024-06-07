import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/ENTITY/Notification.entity';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { AreaEntity } from 'src/ENTITY/Area.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NotificationEntity]), TypeOrmModule.forFeature([AreaEntity])],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
