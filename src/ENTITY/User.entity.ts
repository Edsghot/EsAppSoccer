import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Field1Entity } from './Field1.entity';
import { Field2Entity } from './Field2.entity';
import { BookingEntity } from './Booking.entity';
import { ManagementEntity } from './Management.entity';
import { AreaEntity } from './Area.entity';

@Entity("User")
export class UserEntity {
    @PrimaryGeneratedColumn()
    IdUser: number;

    @OneToMany(() => Field1Entity, field1 => field1.User)
    Field1: Field1Entity[];

    @OneToMany(() => Field2Entity, field2 => field2.User)
    Field2: Field2Entity[];
    
    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Password: string;

    @Column()
    Dni: string;

    @Column()
    EmployeeCode: string;

    @ManyToOne(() => ManagementEntity, m => m.IdManagement)
    Management: ManagementEntity;

    @ManyToOne(() => AreaEntity, m => m.IdArea)
    Area: AreaEntity;

    @Column()
    Shift: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Mail: string;

    @Column()
    Rol: number;   

    @OneToMany(()=>BookingEntity,booking=>booking.IdBooking)
    Booking:BookingEntity[];
}