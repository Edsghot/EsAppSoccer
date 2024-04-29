import { Module } from '@nestjs/common';
import { Field2Controller } from './field2.controller';
import { Field2Service } from './field2.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field2Entity } from 'src/ENTITY/Field2.entity';
import { UserEntity } from 'src/ENTITY/User.entity';
import { BookingEntity } from 'src/ENTITY/Booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Field2Entity]),TypeOrmModule.forFeature([UserEntity]),TypeOrmModule.forFeature([BookingEntity])],
  controllers: [Field2Controller],
  providers: [Field2Service]
})
export class Field2Module {}
