import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from 'src/DTO/Notification/CreateNotification.dto';
import { UpdateNotificationDto } from 'src/DTO/Notification/UpdateNotification.dto';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { NotificationEntity } from 'src/ENTITY/Notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(NotificationEntity) private readonly notificationRepository:Repository<NotificationEntity>,
                @InjectRepository(AreaEntity) private readonly areaReporsitory: Repository<AreaEntity>){}

    async insertNotification(createNotificationDto:CreateNotificationDto){
        try{
            var newNotification=new NotificationEntity();
            
            const area=await this.areaReporsitory.findOne({
                where:{IdArea:createNotificationDto.IdArea}
            })
            if(!area){
                return {msg:"No se encontro el Area",success:false}
            }
            newNotification.Area=area;
            newNotification.Message=createNotificationDto.Message;
            newNotification.IndViewed = false;
            newNotification.Date=new Date();
            var Create=await this.notificationRepository.create(newNotification);
            await this.notificationRepository.save(Create);
            return {msg:"Se inserto correctamente",success:true}
        }catch(e){
            console.error("Error: ", e)
            return { msg: 'Error no se pudo insertar', success: false, detailMsg: e }
        }
    }

    async getAllNotification(){
        try{
            const notification=await this.notificationRepository.find();
            return {data:notification,msg:"Success",success:true};
        }catch(e){
            console.error('Failed to get notification:', e);
            return { msg: 'Failed to get notification:', success: false, detailMsg: e }
        }
    }

    async getNotificationById(notificationId:number){
        try{
            const notification=await this.notificationRepository.findOne({
                where:{IdNotification:notificationId}
            });
            if(!notification){
                return {msg:"La notificacion no existe",success:false}
            }
            return {data:notification,msg:"success",success:true}
        }catch(e){
            console.error('Failed to get notification by ID:', e);
            return { msg: 'Failed to get notification', detailMsg: e, success: false };
        }
    }

    async getAreabyId(managementId: number) {
        try {
            const area = await this.areaReporsitory.findOne({ where: { IdArea: managementId } });
            if (!area) {
                return { msg: "La area no existe", success: false };
            }
    
            const notifications = await this.notificationRepository.find({
                where: { Area: area },
                order: { Date: 'DESC' },
                take: 4
            });
    
            return { data: notifications, msg: "success", success: true };
        } catch (e) {
            console.error('Failed to get area by Id:', e);
            return { msg: 'Failed to get area by Id', detailMsg: e, success: false };
        }
    }
    

    async deleteNotification(notificationId:number){
        try{
            const notification=await this.notificationRepository.findOne({
                where:{IdNotification:notificationId}
            });
            if(!notification){
                return {msg:"La notificacion no existe",success:false}
            }
            await this.notificationRepository.delete(notificationId);
            return { msg: 'Se elimino correctament la notificacion', success: true };
        }catch(e){
            console.error('Failed to delete notification:', e);
            return { msg: 'Failed to delete notification', detailMsg: e, success: false };
        }
    }

    async updateNotification(notificationId:number,updateNotificationDto:UpdateNotificationDto){
        try{
            const notification=await this.notificationRepository.findOne({
                where:{IdNotification:notificationId}
            })
            if(!notification){
                return {msg: 'No se encontro la notificacion', success: false }
            }
            notification.Message=updateNotificationDto.Message;
            notification.IndViewed = updateNotificationDto.IndViewed;
            await this.notificationRepository.save(notification);
            return { msg: 'Se actualizo correctamente la notificacion', success: true };
        }catch(e){
            console.error('Failed to update notification:', e);
            return { msg: 'Failed to update notification', detailMsg: e, success: false };
        }
    }
}
