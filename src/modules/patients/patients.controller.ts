import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patients.entity';
import { CreatePatientDto } from './dto/create-patient-dto';
import { UpdatePatientDto } from './dto/update-patient-dto';

@Controller('')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('patients')
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get('patients/:id')
  async findOne(@Param('id') id: string): Promise<Patient | null> {
    const patientId = parseInt(id, 10);
    return this.patientsService.findOne(patientId);
  }

  @Post('patients')
  async createPatient(@Body() CreatePatientDto: CreatePatientDto): Promise<Patient> {
    //const { firstName, isActive } = createPatient;
    return await this.patientsService.createPatient(CreatePatientDto);
  }

  @Put('patients/:id')
  async update(@Param('id') id: number, @Body() UpdatePatientDto: UpdatePatientDto) {
    return this.patientsService.updatePatient(id, UpdatePatientDto);
  }

  @Delete('patients/:id')
  async removePatient(@Param('id') id: number): Promise<void> {
    await this.patientsService.removePatient(id);
  }
}