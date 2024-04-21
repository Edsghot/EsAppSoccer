import { Module } from '@nestjs/common';
import { UserModule } from './modulos/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field1Module } from './modulos/field1/field1.module';
import { Field2Module } from './modulos/field2/field2.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'ccontrolz.com',
    port: 3306,
    username: 'nibcqvah_edsghot',
    password: 'Repro123.',
    database: 'nibcqvah_EsAppSoccer',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}),UserModule, Field1Module, Field2Module],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
