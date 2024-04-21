import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

export class Field2Entity{
    @PrimaryGeneratedColumn()
    IdField2Entity: number;
    @ManyToOne(() => UserEntity, user => user.Field2)
    User: UserEntity;
    @Column()
    startTime: string;
    @Column()
    endTime: string;
    @Column()
    date: Date;
}