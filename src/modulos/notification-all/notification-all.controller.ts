import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateNotificationAllDto } from "src/DTO/NotificationAll/CreateNotificationAllDto.dto";
import { UpdateNotificationAllDto } from "src/DTO/NotificationAll/UpdateNotificationAllDto.dto";
import { NotificationAllService } from "./notification-all.service";
import { WeeklyDto } from "src/DTO/Field1/weeklyDto.dto";

@Controller('api/notification-all')
export class NotificationAllController {
    constructor(private readonly serviceNotification: NotificationAllService) {}

    @Post('/insert')
    async insertNotification(@Body() createNotificationAllDto: CreateNotificationAllDto) {
        return this.serviceNotification.insertNotification(createNotificationAllDto);
    }

    @Get('/getAll')
    async getAllNotifications() {
        return this.serviceNotification.getAllNotifications();
    }

    @Get('/getById/:id')
    async getNotificationById(@Param('id') notificationId: number) {
        return this.serviceNotification.getNotificationById(notificationId);
    }

    @Get('/getLast')
    async getLastNotification() {
        return this.serviceNotification.getLastNotification();
    }

    @Delete('/delete/:id')
    async deleteNotification(@Param('id') notificationId: number) {
        return this.serviceNotification.deleteNotification(notificationId);
    }

    @Put('/update/:id')
    async updateNotification(@Param('id') notificationId: number, @Body() updateNotificationAllDto: UpdateNotificationAllDto) {
        return this.serviceNotification.updateNotification(notificationId, updateNotificationAllDto);
    }

    @Post('/ReportNotification/')
    async ReportNotification(@Body() request: WeeklyDto) {
        return this.serviceNotification.getNotificationsBetweenDates(request);
    }
}
