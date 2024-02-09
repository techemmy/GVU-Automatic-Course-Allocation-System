import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LecturersModule } from './lecturers/lecturers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/acas'),
    LecturersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
