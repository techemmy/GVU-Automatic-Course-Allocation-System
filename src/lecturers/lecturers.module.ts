import { Module } from '@nestjs/common';
import { LecturersController } from './lecturers.controller';
import { LecturersService } from './lecturers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lecturer, lecturerSchema } from './schemas/lecturer.schema';
import { DepartmentsModule } from 'src/departments/departments.module';
import { SpecializationModule } from 'src/specialization/specialization.module';

@Module({
  imports: [
    DepartmentsModule,
    SpecializationModule,
    MongooseModule.forFeature([
      { name: Lecturer.name, schema: lecturerSchema },
    ]),
  ],
  controllers: [LecturersController],
  providers: [LecturersService],
})
export class LecturersModule {}
