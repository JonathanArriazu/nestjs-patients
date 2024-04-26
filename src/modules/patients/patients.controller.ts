import { Controller, Get, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patients.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient | null> {
    const patientId = parseInt(id, 10);
    return this.patientsService.findOne(patientId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const patientId = parseInt(id, 10);
    await this.patientsService.remove(patientId);
  }
}