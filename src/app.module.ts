import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LecturersModule } from './lecturers/lecturers.module';
import { SpecializationModule } from './specialization/specialization.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/acas'),
    LecturersModule,
    SpecializationModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
