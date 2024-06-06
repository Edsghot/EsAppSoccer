import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ManagementEntity } from "./Management.entity";
import { UserEntity } from "./User.entity";
import { AreaEntity } from "./Area.entity";

@Entity("Notification")
export class NotificationEntity{
    @PrimaryGeneratedColumn()
    IdNotification:number;
    @Column()
    Message:string;
    @Column()
    IndViewed: Boolean;
    @Column()
    Date:Date;
    @ManyToOne(()=>AreaEntity,area=>area.Notification)
    Area:AreaEntity;
    @ManyToOne(()=>UserEntity,user=>user.Notification)
    User:UserEntity;
}