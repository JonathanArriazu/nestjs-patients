import { BaseEntity } from 'src/config/database/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  firstName: string;


  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true }) 
    deletedAt: Date;
}