import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ManagementEntity } from "./Management.entity";

@Entity("Notification")
export class NotificationEntitty{
    @PrimaryGeneratedColumn()
    IdNotification:number;
    @Column()
    Mesage:string;
    @Column()
    Date:Date;
    @ManyToOne(()=>ManagementEntity,management=>management.Notification)
    Management:ManagementEntity;
}