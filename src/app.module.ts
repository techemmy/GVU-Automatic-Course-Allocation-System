import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LecturersModule } from './lecturers/lecturers.module';
import { SpecializationModule } from './specialization/specialization.module';
import { CoursesModule } from './courses/courses.module';
import {
  CourseLecturerAllocation,
  courseLecturerAllocationSchema,
} from './schemas/allocation.schema';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    MongooseModule.forFeature([
      {
        name: CourseLecturerAllocation.name,
        schema: courseLecturerAllocationSchema,
      },
    ]),
    LecturersModule,
    SpecializationModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
