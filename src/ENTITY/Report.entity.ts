import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AreaEntity } from "./Area.entity";

@Entity("Report")
export class ReportEntity{
    @PrimaryGeneratedColumn()
    IdReport:number;
    @Column("text")
    Description:string;
    @Column()
    IndViewed: Boolean;
    @Column()
    Date:string;
    @Column()
    NamePlayer:string;
    @ManyToOne(() => AreaEntity, area => area.Report)
    Area: AreaEntity;
    @Column()
    DateRegister: Date;
}