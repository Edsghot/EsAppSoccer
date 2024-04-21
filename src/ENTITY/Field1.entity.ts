import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

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
    DateDay: Date;
}