import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Patient } from './entities/patients.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  async createPatient(firstName: string, isActive: boolean): Promise<Patient> {
    const newPatient = this.patientsRepository.create({ firstName, isActive });

    try {
      const savedPatient = await this.patientsRepository.save(newPatient);
      return savedPatient;
    } catch (error) {
      throw new HttpException('Failed to create patient', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number): Promise<Patient | null> {
    return this.patientsRepository.findOneBy({ id });
  }

  async updatePatient(id: number, updatePatient: Partial<Patient>): Promise<UpdateResult | undefined> {
      const patient: UpdateResult = await this.patientsRepository.update(
        id,
        updatePatient,
      );
      return patient;
  }

  /* async remove(id: number): Promise<void> {
    await this.patientsRepository.delete(id);
  } */
  async removePatient(id: number): Promise<void> {
    const existingPatient = await this.patientsRepository.findOne({
      where: { id }
    });

    existingPatient.isActive = false;

    await this.patientsRepository.save(existingPatient);
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