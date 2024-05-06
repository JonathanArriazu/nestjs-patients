import { BaseEntity } from "src/config/database/base.entity";
import { MedicalHistory } from "src/modules/medical-history/entities/medical-history.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity()
export class Desease extends BaseEntity{

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({name: 'medicalHistory_id'})
    medicalHistoryId: number;    

    @ManyToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.deseases)
    @JoinColumn({name: 'medicalHistory_id'})
    medicalHistory: MedicalHistory []
}
