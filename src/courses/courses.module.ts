import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, courseSchema } from './schemas/course.schema';
import {
  CourseLecturerAllocation,
  courseLecturerAllocationSchema,
} from 'src/schemas/allocation.schema';
import { LecturersModule } from 'src/lecturers/lecturers.module';
import { SpecializationModule } from 'src/specialization/specialization.module';

@Module({
  imports: [
    SpecializationModule,
    LecturersModule,
    MongooseModule.forFeature([{ name: Course.name, schema: courseSchema }]),
    MongooseModule.forFeature([
      {
        name: CourseLecturerAllocation.name,
        schema: courseLecturerAllocationSchema,
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
