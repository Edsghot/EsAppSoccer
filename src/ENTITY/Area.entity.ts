import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ManagementEntity } from "./Management.entity";
import { ReportEntity } from "./Report.entity";

@Entity("Area")
export class AreaEntity{
    @PrimaryGeneratedColumn()
    IdArea: number;
    @Column()
    NameArea: string;
    @Column()
    Date: Date;
    @ManyToOne(() => ManagementEntity, management => management.Area)
    Management: ManagementEntity;
    @OneToMany(() => ReportEntity, report => report.Area)
    Report: ReportEntity[];
}
