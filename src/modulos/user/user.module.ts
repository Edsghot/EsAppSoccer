import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/ENTITY/User.entity';
import { ValidateService } from '../Validate/validate.service';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { AreaEntity } from 'src/ENTITY/Area.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),TypeOrmModule.forFeature([AreaEntity])
      ],
  controllers: [UserController],
  providers: [UserService,ValidateService]
})
export class UserModule {}
