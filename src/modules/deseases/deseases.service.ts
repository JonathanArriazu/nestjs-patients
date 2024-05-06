import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeseaseDto } from './dto/create-desease.dto';
import { UpdateDeseaseDto } from './dto/update-desease.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Desease } from './entities/desease.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DeseasesService {
  constructor(
    @InjectRepository(Desease)
    private readonly deseasesRepository: Repository<Desease>,
  ) {}

  findAll(): Promise<Desease[]> {
    try{
      return this.deseasesRepository.find({
        relations: {
          medicalHistory: true,
        }
      });
    } catch (error) {
      throw new HttpException('Failed to find deseases', HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }

  async createDesease(CreateDeseaseDto: CreateDeseaseDto): Promise<Desease> {
    const newDesease = this.deseasesRepository.create(CreateDeseaseDto);
    //const newHistory = this.histo
    try {
      const savedDesease = await this.deseasesRepository.save(newDesease);
      return savedDesease;
    } catch (error) {
      throw new HttpException('Failed to create desease', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Desease | null> {
    try{
      return await this.deseasesRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Failed to find desease', HttpStatus.INTERNAL_SERVER_ERROR);
    } 
    
  }

  async updateDesease(id: number, UpdateDeseaseDto: UpdateDeseaseDto): Promise<UpdateResult | undefined> {
    
    try{
      const patient: UpdateResult = await this.deseasesRepository.update(
        id,
        UpdateDeseaseDto,
      );
      return patient;
    } catch (error) {
      throw new HttpException('Failed to update desease', HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }

  remove(id: number) {
    return `This action removes a #${id} desease`;
  }
}
