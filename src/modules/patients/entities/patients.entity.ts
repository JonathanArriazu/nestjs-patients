import { BaseEntity } from 'src/config/database/base.entity';
import { MedicalHistory } from 'src/modules/medical-history/entities/medical-history.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Patient extends BaseEntity {

  @Column()
  fullName: string;


  @Column({ default: true })
  isActive: boolean;

  @Column({name: 'medicalHistory_id'})
  medicalHistoryId: number;

  @OneToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
    @JoinColumn({name: 'medicalHistory_id'})
    medicalHistory: MedicalHistory;
}