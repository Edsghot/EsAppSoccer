import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity("Field2")
export class Field2Entity{
    @PrimaryGeneratedColumn()
    IdField2Entity: number;
    @ManyToOne(() => UserEntity, user => user.Field2)
    User: UserEntity;
    @Column()
    StartTime: string;
    @Column()
    EndTime: string;
    @Column()
    DateDay: Date;
}