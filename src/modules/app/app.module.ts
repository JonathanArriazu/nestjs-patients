import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database/data.base';
import { PatientsModule } from '../patients/patients.module';
import { ConfigModule } from '@nestjs/config';
import { MedicalHistoryModule } from '../medical-history/medical-history.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PatientsModule,
    MedicalHistoryModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger('AppModule');

  constructor() {
    this.logger.log('AppModule initialized');
  }
}
