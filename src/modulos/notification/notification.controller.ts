import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from 'src/DTO/Notification/CreateNotification.dto';
import { UpdateNotificationDto } from 'src/DTO/Notification/UpdateNotification.dto';

@Controller('api/notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post("/insert")
    async insertNotification(@Body() createNotificationDto: CreateNotificationDto) {
        return await this.notificationService.insertNotification(createNotificationDto);
    }

    @Get()
    async getAllNotification() {
        return await this.notificationService.getAllNotification();
    }

    @Get('/getById/:id')
    async getNotificationById(@Param('id') id: number) {
        return await this.notificationService.getNotificationById(id);
    }

    @Get('getAreaById/:id')
    async getAreaById(@Param('id')id:number){
        return await this.notificationService.getAreabyId(id);
    }

    @Delete(':id')
    async deleteNotification(@Param('id') id: number) {
        return await this.notificationService.deleteNotification(id);
    }

    @Put('/update/:id')
    async updateNotification(@Param('id') id: number, @Body() updateNotificationDto: UpdateNotificationDto) {
        return await this.notificationService.updateNotification(id, updateNotificationDto);
    }
}
