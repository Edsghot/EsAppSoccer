import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity("Booking")
export class BookingEntity{
    @PrimaryGeneratedColumn()
    IdBooking: number;
    @Column()
    DateWeekend: string;
    @Column()
    Quantity: number;
    @Column("text")
    ListPlayer:string;
    @Column()
    IdUser: number;
}
