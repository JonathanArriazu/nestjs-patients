import { BaseEntity } from "src/config/database/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MedicalHistory extends BaseEntity {
    
    @Column()
    visitDate: Date;

    @Column()
    medicalCondition: string;

    @Column()
    medications: string;    
}