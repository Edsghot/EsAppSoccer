
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { WeeklyDto } from 'src/DTO/Field1/weeklyDto.dto';
import { CreateNotificationAllDto } from 'src/DTO/NotificationAll/CreateNotificationAllDto.dto';
import { UpdateNotificationAllDto } from 'src/DTO/NotificationAll/UpdateNotificationAllDto.dto';
import { NotificationAllEntity } from 'src/ENTITY/NotificationAll.entity';
import { Between, Repository } from 'typeorm';
@Injectable()
export class NotificationAllService {
    constructor(
        @InjectRepository(NotificationAllEntity) 
        private readonly notificationRepository: Repository<NotificationAllEntity>
    ) {}

    async insertNotification(createNotificationAllDto: CreateNotificationAllDto) {
        try {
            const newNotification = new NotificationAllEntity();
            newNotification.DateRegister = moment.tz('America/Lima').toDate();;
            newNotification.DateDay = createNotificationAllDto.DateDay;
            newNotification.Time = createNotificationAllDto.Time;
            newNotification.Message = createNotificationAllDto.Message;

            const created = await this.notificationRepository.create(newNotification);
            await this.notificationRepository.save(created);
            return { msg: "Se inserto correctamente", success: true };
        } catch (e) {
            console.error("Error: ", e);
            return { msg: 'Error no se pudo insertar', success: false, detailMsg: e };
        }
    }

    async getAllNotifications() {
        try {
            const notifications = await this.notificationRepository.find();
            return { data: notifications, msg: "Success", success: true };
        } catch (e) {
            console.error('Failed to get notifications:', e);
            return { msg: 'Failed to get notifications', success: false, detailMsg: e };
        }
    }

    async getNotificationById(notificationId: number) {
        try {
            const notification = await this.notificationRepository.findOne({
                where: { IdNotificationAll: notificationId }
            });
            if (!notification) {
                return { msg: "La notificacion no existe", success: false };
            }
            return { data: notification, msg: "success", success: true };
        } catch (e) {
            console.error('Failed to get notification by ID:', e);
            return { msg: 'Failed to get notification', detailMsg: e, success: false };
        }
    }

    async getLastNotification() {
        try {
            const [lastNotification] = await this.notificationRepository.find({
                order: { DateRegister: 'DESC' },
                take: 1
            });
            if (!lastNotification) {
                return { msg: "No hay notificaciones disponibles", success: false };
            }
            return { data: lastNotification, msg: "success", success: true };
        } catch (e) {
            console.error('Failed to get the last notification:', e);
            return { msg: 'Failed to get the last notification', detailMsg: e, success: false };
        }
    }

    async getNotificationsBetweenDates(request: WeeklyDto) {
        try {
            const notifications = await this.notificationRepository
                .createQueryBuilder('notificationAll')
                .where('notificationAll.DateRegister BETWEEN :startDate AND :endDate', {
                    startDate: request.StartDate,
                    endDate: request.EndDate,
                })
                .getMany();
    
            if (notifications.length === 0) {
                return { msg: "No hay notificaciones disponibles", success: false };
            }
    
            return { data: notifications, msg: "success", success: true };
        } catch (e) {
            console.error('Failed to get notifications between dates:', e);
            return { msg: 'Failed to get notifications between dates', detailMsg: e, success: false };
        }
    }
    
    
    

    async deleteNotification(notificationId: number) {
        try {
            const notification = await this.notificationRepository.findOne({
                where: { IdNotificationAll: notificationId }
            });
            if (!notification) {
                return { msg: "La notificacion no existe", success: false };
            }
            await this.notificationRepository.delete(notificationId);
            return { msg: 'Se elimino correctamente la notificacion', success: true };
        } catch (e) {
            console.error('Failed to delete notification:', e);
            return { msg: 'Failed to delete notification', detailMsg: e, success: false };
        }
    }

    async updateNotification(notificationId: number, updateNotificationAllDto: UpdateNotificationAllDto) {
        try {
            const notification = await this.notificationRepository.findOne({
                where: { IdNotificationAll: notificationId }
            });
            if (!notification) {
                return { msg: 'No se encontro la notificacion', success: false };
            }
            notification.DateDay = updateNotificationAllDto.DateDay;
            notification.Time = updateNotificationAllDto.Time;
            notification.Message = updateNotificationAllDto.Message;
            await this.notificationRepository.save(notification);
            return { msg: 'Se actualizo correctamente la notificacion', success: true };
        } catch (e) {
            console.error('Failed to update notification:', e);
            return { msg: 'Failed to update notification', detailMsg: e, success: false };
        }
    }


}
