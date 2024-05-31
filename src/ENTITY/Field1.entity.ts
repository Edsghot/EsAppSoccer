import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { StringifyOptions } from "querystring";

@Entity("Field1")
export class Field1Entity {
    @PrimaryGeneratedColumn()
    IdField1Entity: number;

    @ManyToOne(() => UserEntity, user => user.Field1)
    User: UserEntity;

    @Column()
    StartTime: string;
    @Column()
    EndTime: string;
    @Column()
    DateDay: string;
    @Column("text")
    ListPlayer:string;
}