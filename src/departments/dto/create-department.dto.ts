import { IsString, IsNumber } from "class-validator";

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  maximumLevel: number;
}
