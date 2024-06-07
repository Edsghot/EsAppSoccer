import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Field1Entity } from './Field1.entity';
import { Field2Entity } from './Field2.entity';
import { BookingEntity } from './Booking.entity';
import { AreaEntity } from './Area.entity';
import { NotificationEntity } from './Notification.entity';


/*
1. exclusivo
2. trabajador normal
3. administrado de cancha
4. administrador de sistema
*/

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

    @ManyToOne(() => AreaEntity, m => m.IdArea,{ cascade: true })
    Area: AreaEntity;

    @Column()
    Shift: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Mail: string;

    @Column()
    Rol: number;
    
    @Column()
    Date:Date;

    @Column()
    IndActive:Boolean;

    @OneToMany(()=>BookingEntity,booking=>booking.IdBooking)
    Booking:BookingEntity[];

    @OneToMany(()=>NotificationEntity,notification=>notification.IdNotification)
    Notification:NotificationEntity[];
}