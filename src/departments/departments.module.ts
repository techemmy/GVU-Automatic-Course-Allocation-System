import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import {
  Department,
  departmentSchema,
} from 'src/departments/schemas/department.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Department.name,
        schema: departmentSchema,
      },
    ]),
  ],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
