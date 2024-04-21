import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum Shift {
    MORNING = 'Morning',
    NIGHT = 'Night',
}

@Entity("User")
export class UserEntity {
    @PrimaryGeneratedColumn()
    IdUser: number;

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

    @Column({
        type: 'enum',
        enum: Shift,
        default: Shift.MORNING,
    })
    Shift: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Mail: string;

    @Column()
    Rol: number;
}