import { BaseEntity } from "src/config/database/base.entity";
import { Patient } from "src/modules/patients/entities/patients.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MedicalHistory extends BaseEntity {
    delete(id: number) {
      throw new Error('Method not implemented.');
    }
    
    @Column()
    visitDate: Date;

    @Column()
    medicalCondition: string;

    @Column()
    medications: string;    

    @OneToOne(() => Patient, (patient) => patient.medicalHistory)
    patient: Patient;
}