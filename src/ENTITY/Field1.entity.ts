import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

export class Field1Entity {
    @PrimaryGeneratedColumn()
    IdField1Entity: number;

    @ManyToOne(() => UserEntity, user => user.Field1)
    User: UserEntity;

    @Column()
    startTime: string;
    @Column()
    endTime: string;
    @Column()
    date: Date;
}