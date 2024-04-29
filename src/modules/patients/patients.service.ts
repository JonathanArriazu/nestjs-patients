import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createPatient(firstName: string, lastName: string, isActive: boolean): Promise<Patient> {
    const newPatient = this.patientsRepository.create({ firstName, lastName, isActive });
    return await this.patientsRepository.save(newPatient);
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
      where: { id }, // Buscar paciente por ID
    });

    if (!existingPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    // Cambiar isActive a false
    existingPatient.isActive = false;

    // Guardar los cambios en la base de datos
    await this.patientsRepository.save(existingPatient);
  }
}