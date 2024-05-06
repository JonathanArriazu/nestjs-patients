/* import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DtoErrors } from 'src/constants/errorsMessage.enum'; */

export class CreatePatientDto {
  //@IsNotEmpty()
  //@IsString({ message: DtoErrors.NAME_EMPTY })
  fulltName: string;

  //@IsNotEmpty()
  //@IsString({ message: DtoErrors.DESCRIPTIONS_EMPTY })
  isActive: boolean;

  medicalHistoryId: number;
}