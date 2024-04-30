import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database/data.base';
import { PatientsModule } from '../patients/patients.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PatientsModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
