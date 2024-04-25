import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field1Entity } from './Field1.entity';
import { Field2Entity } from './Field2.entity';

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

    @Column()
    Area: string;

    @Column()
    Shift: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Mail: string;

    @Column()
    Rol: number;

    @Column()
    Laboratory: string;
}