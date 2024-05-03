import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { MedicalHistory } from './entities/medical-history.entity';

@Controller('')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @Post('medical-histories')
  async createPatient(@Body() CreatePatientDto: CreateMedicalHistoryDto): Promise<MedicalHistory> {
    //const { firstName, isActive } = createPatient;
    return await this.medicalHistoryService.createPatient(CreatePatientDto);
  }

  @Get('medical-histories')
  findAll() {
    return this.medicalHistoryService.findAll();
  }

  @Get('medical-histories/:id')
  findOne(@Param('id') id: string) {
    return this.medicalHistoryService.findOne(+id);
  }

  @Patch('medical-histories/:id')
  update(@Param('id') id: string, @Body() updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    return this.medicalHistoryService.updateMedicalHistory(+id, updateMedicalHistoryDto);
  }

  @Delete('medical-histories/:id')
  async removeMedicalHistory(@Param('id') id: number): Promise<void> {
    await this.medicalHistoryService.removeMedicalHistory(id);
  }
}
