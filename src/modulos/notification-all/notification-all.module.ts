import { Module } from '@nestjs/common';
import { NotificationAllService } from './notification-all.service';
import { NotificationAllController } from './notification-all.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationAllEntity } from 'src/ENTITY/NotificationAll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationAllEntity])],
  providers: [NotificationAllService],
  controllers: [NotificationAllController]
})
export class NotificationAllModule {}
