import { Module } from '@nestjs/common';
import { UserModule } from './modulos/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field1Module } from './modulos/field1/field1.module';
import { Field2Module } from './modulos/field2/field2.module';
import { AreaModule } from './modulos/area/area.module';
import { ManagementModule } from './modulos/management/management.module';
import { NotificationModule } from './modulos/notification/notification.module';
import { ReportModule } from './modulos/report/report.module';
import { AuthValidateModule } from './modulos/auth-validate/auth-validate.module';
import { NotificationAllModule } from './modulos/notification-all/notification-all.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'jhedgost.com',
    port: 3306,
    username: 'dbjhfjuv_edsghot',
    password: 'Repro321.',
    database: 'nibcqvah_EsAppSoccer',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}),UserModule, Field1Module, Field2Module, AreaModule, ManagementModule, NotificationModule, ReportModule,AuthValidateModule, NotificationAllModule,ConfigModule.forRoot({
  isGlobal: true,
}) ],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
