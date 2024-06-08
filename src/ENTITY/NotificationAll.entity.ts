import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AreaEntity } from "./Area.entity";
import { UserEntity } from "./User.entity";

@Entity("NotificationAll")
export class NotificationAllEntity{
    @PrimaryGeneratedColumn()
    IdNotificationAll:number;
    @Column()
    DateRegister: Date;
    @Column()
    DateDay: Date;
    @Column()
    Time: string;
    @Column()
    Message:string;
}