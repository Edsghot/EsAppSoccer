import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntitty } from 'src/ENTITY/Notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(NotificationEntitty) private readonly notificationRepository:Repository<NotificationEntitty>){}
}
