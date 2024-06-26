import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Patient } from './entities/patients.entity';
import { CreatePatientDto } from './dto/create-patient-dto';
import { UpdatePatientDto } from './dto/update-patient-dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    try{
      return this.patientsRepository.find({
        relations: {
          medicalHistory: true,
        }
      });
    } catch (error) {
      throw new HttpException('Failed to find patients', HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }

  async createPatient(CreatePatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient = this.patientsRepository.create(CreatePatientDto);
    //const newHistory = this.histo
    try {
      const savedPatient = await this.patientsRepository.save(newPatient);
      return savedPatient;
    } catch (error) {
      throw new HttpException('Failed to create patient', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number): Promise<Patient | null> {
    try{
      return this.patientsRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Failed to find patient', HttpStatus.INTERNAL_SERVER_ERROR);
    } 
    
  }

  async updatePatient(id: number, UpdatePatientDto: UpdatePatientDto): Promise<UpdateResult | undefined> {
    
    try{
      const patient: UpdateResult = await this.patientsRepository.update(
        id,
        UpdatePatientDto,
      );
      return patient;
    } catch (error) {
      throw new HttpException('Failed to update patient', HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }

  /* async remove(id: number): Promise<void> {
    await this.patientsRepository.delete(id);
  } */
  async removePatient(id: number): Promise<void> {
    try{
      const existingPatient = await this.patientsRepository.findOne({
        where: { id }
      });
  
      existingPatient.isActive = false;
  
      await this.patientsRepository.save(existingPatient);
    } catch (error) {
      throw new HttpException('Failed to update patient', HttpStatus.INTERNAL_SERVER_ERROR);
    }         
  }

  /* async remove(idcategory: string): Promise<DeleteResult | undefined> {
    try {
      const result = await this.categoryRepository.softDelete(idcategory);
      if (result.affected === 0) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'An error occurred while deleting the category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  } */
}