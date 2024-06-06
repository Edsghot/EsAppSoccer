import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AreaEntity } from "./Area.entity";
import { NotificationEntity } from "./Notification.entity";
import { UserEntity } from "./User.entity";

@Entity("Management")
export class ManagementEntity{
    @PrimaryGeneratedColumn()
    IdManagement: number;
    @Column()
    NameManagement:string;
    @OneToMany(() => AreaEntity, area => area.IdArea)
    Area: AreaEntity[];
   
}