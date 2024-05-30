import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ManagementEntity } from "./Management.entity";

@Entity("Notification")
export class NotificationEntity{
    @PrimaryGeneratedColumn()
    IdNotification:number;
    @Column()
    Message:string;
    @Column()
    Date:Date;
    @ManyToOne(()=>ManagementEntity,management=>management.Notification)
    Management:ManagementEntity;
}