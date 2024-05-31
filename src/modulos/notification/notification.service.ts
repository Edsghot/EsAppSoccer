import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from 'src/DTO/Notification/CreateNotification.dto';
import { UpdateNotificationDto } from 'src/DTO/Notification/UpdateNotification.dto';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { NotificationEntity } from 'src/ENTITY/Notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(NotificationEntity) private readonly notificationRepository:Repository<NotificationEntity>,
                @InjectRepository(ManagementEntity) private readonly managementRepository: Repository<ManagementEntity>){}

    async insertNotification(createNotificationDto:CreateNotificationDto){
        try{
            var newNotification=new NotificationEntity();
            
            const management=await this.managementRepository.findOne({
                where:{IdManagement:createNotificationDto.IdManagement}
            })
            if(!management){
                return {msg:"No se encontro la gerencia",success:false}
            }
            newNotification.Management=management;
            newNotification.Message=createNotificationDto.Message;
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

    async getManagementById(managementId:number){
        try{

            const manag=await this.managementRepository.findOne({where: {IdManagement:managementId}});
            if(!manag){
                return {msg:"La gerencia no existe",success:false}
            }
            const management=await this.notificationRepository.find({
                where:{Management:manag}
            });
            return {data:management,msg:"success",success:true}
        }catch(e){
            console.error('Failed to get management by Id:', e);
            return { msg: 'Failed to get management by Id', detailMsg: e, success: false };
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
            await this.notificationRepository.save(notification);
            return { msg: 'Se actualizo correctamente la notificacion', success: true };
        }catch(e){
            console.error('Failed to update notification:', e);
            return { msg: 'Failed to update notification', detailMsg: e, success: false };
        }
    }
}
