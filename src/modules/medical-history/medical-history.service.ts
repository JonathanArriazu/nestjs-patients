import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Desease } from '../deseases/entities/desease.entity';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
  ) {}

  async findAll(): Promise<MedicalHistory[]> {
    try{
      return await this.medicalHistoryRepository.find({
        relations: {
          deseases: true,
        }
      });
    } catch (error) {
      throw new HttpException('Failed to find medical histories', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<MedicalHistory | null> {
    try{
      return await this.medicalHistoryRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Failed to find medical history', HttpStatus.INTERNAL_SERVER_ERROR);
    } 
    
  }

  async createPatient(CreateMedicalHistoryDto: CreateMedicalHistoryDto): Promise<MedicalHistory> {
    const newPatient = this.medicalHistoryRepository.create(CreateMedicalHistoryDto);

    try {
      const savedMedicalhistory = await this.medicalHistoryRepository.save(newPatient);
      return savedMedicalhistory;
    } catch (error) {
      throw new HttpException('Failed to create medical history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateMedicalHistory(id: number, UpdateMedicalHistoryDto: UpdateMedicalHistoryDto): Promise<UpdateResult | undefined> {
    
    try{
      const medicalHistory: UpdateResult = await this.medicalHistoryRepository.update(
        id,
        UpdateMedicalHistoryDto,
      );
      return medicalHistory;
    } catch (error) {
      throw new HttpException('Failed to update medical history', HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }

  async removeMedicalHistory(id: number): Promise<DeleteResult | undefined> {
    try{
      const result: DeleteResult = await this.medicalHistoryRepository.delete(id);
      return result;
    }catch{
      throw new HttpException('Failed to delete medical history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
