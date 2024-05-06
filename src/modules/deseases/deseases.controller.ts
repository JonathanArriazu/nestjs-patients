import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeseasesService } from './deseases.service';
import { CreateDeseaseDto } from './dto/create-desease.dto';
import { UpdateDeseaseDto } from './dto/update-desease.dto';
import { Desease } from './entities/desease.entity';

@Controller('')
export class DeseasesController {
  constructor(private readonly deseasesService: DeseasesService) {}

  @Get('deseases')
  async findAll(): Promise<Desease[]> {
    return this.deseasesService.findAll();
  }

  @Get('deseases/:id')
  findOne(@Param('id') id: string) {
    return this.deseasesService.findOne(+id);
  }

  @Post('deseases')
  async createDesease(@Body() createDeseaseDto: CreateDeseaseDto): Promise<Desease> {
    //const { firstName, isActive } = createPatient;
    return await this.deseasesService.createDesease(createDeseaseDto);
  }

  @Patch('deseases/:id')
  update(@Param('id') id: string, @Body() updateDeseaseDto: UpdateDeseaseDto) {
    return this.deseasesService.updateDesease(+id, updateDeseaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deseasesService.remove(+id);
  }
}
