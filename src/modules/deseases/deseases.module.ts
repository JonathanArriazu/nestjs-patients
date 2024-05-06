import { Module } from '@nestjs/common';
import { DeseasesService } from './deseases.service';
import { DeseasesController } from './deseases.controller';
import { Desease } from './entities/desease.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Desease])],
  controllers: [DeseasesController],
  providers: [DeseasesService],
})
export class DeseasesModule {}
