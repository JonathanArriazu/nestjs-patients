import { BaseEntity } from 'src/config/database/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  fullName: string;


  @Column({ default: true })
  isActive: boolean;
}