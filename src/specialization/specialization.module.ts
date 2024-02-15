import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Specialization,
  specializationSchema,
} from './schemas/specialization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Specialization.name,
        schema: specializationSchema,
      },
    ]),
  ],
  controllers: [SpecializationController],
  providers: [SpecializationService],
  exports: [SpecializationService],
})
export class SpecializationModule {}
