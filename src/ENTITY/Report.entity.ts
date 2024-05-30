import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AreaEntity } from "./Area.entity";

@Entity("Report")
export class ReportEntity{
    @PrimaryGeneratedColumn()
    IdReport:number;
    @Column("text")
    Description:string;
    @Column()
    Date:Date;
    @ManyToOne(() => AreaEntity, area => area.Report)
    Area: AreaEntity;
}