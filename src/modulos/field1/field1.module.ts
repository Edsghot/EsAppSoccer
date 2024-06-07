import { Module } from '@nestjs/common';
import { Field1Service } from './field1.service';
import { Field1Controller } from './field1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field1Entity } from 'src/ENTITY/Field1.entity';
import { UserEntity } from 'src/ENTITY/User.entity';
import { AreaEntity } from 'src/ENTITY/Area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Field1Entity]),TypeOrmModule.forFeature([UserEntity]),TypeOrmModule.forFeature([AreaEntity])],
  providers: [Field1Service],
  controllers: [Field1Controller]
})
export class Field1Module {}
