import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity("Booking")
export class BookingEntity{
    @PrimaryGeneratedColumn()
    IdBooking: number;
    @Column()
    DateWeekend: string;
    @Column()
    Quantity: number;
    @Column()
    IdUser: number;
    @Column("text")
    ListPlayer:string;

    @ManyToOne(()=>UserEntity,user=>user.Booking)
    user:UserEntity;
}
