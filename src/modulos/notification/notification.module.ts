import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntitty } from 'src/ENTITY/Notification.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NotificationEntitty])],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
