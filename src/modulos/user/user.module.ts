import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/ENTITY/User.entity';
import { ValidateService } from '../Validate/validate.service';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { ValidateEmailSmsEntity } from 'src/ENTITY/ValidateEmailSms.entity';
import { AuthValidateService } from '../auth-validate/auth-validate.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),TypeOrmModule.forFeature([AreaEntity]),TypeOrmModule.forFeature([ValidateEmailSmsEntity])
      ,HttpModule,ConfigModule],
  controllers: [UserController],
  providers: [UserService,ValidateService,AuthValidateService]
})
export class UserModule {}
