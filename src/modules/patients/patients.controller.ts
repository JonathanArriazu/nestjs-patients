import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patients.entity';

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
  async createPatient(@Body() createPatient: Patient): Promise<Patient> {
    const { firstName, isActive } = createPatient;
    return await this.patientsService.createPatient(firstName, isActive);
  }

  @Put('patients/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: any) {
    return this.patientsService.updatePatient(id, updateUserDto);
  }

  @Delete('patients/:id')
  async removePatient(@Param('id') id: number): Promise<void> {
    await this.patientsService.removePatient(id);
  }
}