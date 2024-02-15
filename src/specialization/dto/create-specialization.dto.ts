import { IsString } from 'class-validator';

export class CreateSpecializationDto {
  @IsString()
  name: string;
}
