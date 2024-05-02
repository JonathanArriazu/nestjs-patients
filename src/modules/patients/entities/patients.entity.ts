import { BaseEntity } from 'src/config/database/base.entity';
import { MedicalHistory } from 'src/modules/medical-history/entities/medical-history.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Patient extends BaseEntity {

  @Column()
  fullName: string;


  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => MedicalHistory)
    @JoinColumn()
    medicalHistory: MedicalHistory
}