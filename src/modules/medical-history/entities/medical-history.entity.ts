import { BaseEntity } from "src/config/database/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}