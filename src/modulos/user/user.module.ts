import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/ENTITY/User.entity';
import { ValidateService } from '../Validate/validate.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
      ],
  controllers: [UserController],
  providers: [UserService,ValidateService]
})
export class UserModule {}
