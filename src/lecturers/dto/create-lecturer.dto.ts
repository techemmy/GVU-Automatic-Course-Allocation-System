import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateLecturerDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOfBirth: Date;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => Number.parseInt(value))
  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  available: boolean;

  @IsString()
  title: string;
}
