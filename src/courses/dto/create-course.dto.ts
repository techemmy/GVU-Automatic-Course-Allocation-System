import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Specialization } from 'src/specialization/schemas/specialization.schema';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  specialization: Specialization;
}
