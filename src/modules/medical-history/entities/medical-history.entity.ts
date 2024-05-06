import { BaseEntity } from "src/config/database/base.entity";
import { Desease } from "src/modules/deseases/entities/desease.entity";
import { Patient } from "src/modules/patients/entities/patients.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Desease, (desease) => desease.medicalHistory)
    deseases: Desease []
}