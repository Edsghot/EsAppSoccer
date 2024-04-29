import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Booking")
export class BookingEntity{
    @PrimaryGeneratedColumn()
    IdField1Entity: number;
    @Column()
    DateWeekend: string;
    @Column()
    Quantity: number;
    @Column()
    IdUser: number;
}
