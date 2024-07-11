import { Injectable } from '@nestjs/common';
import {
  CourseLecturerAllocation,
  CourseLecturerAllocationDocument,
} from './schemas/allocation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SpecializationService } from './specialization/specialization.service';

@Injectable()
export class AppService {
  constructor(
    private readonly specializationService: SpecializationService,
    @InjectModel(CourseLecturerAllocation.name)
    private courseLecturerAllocationModel: Model<CourseLecturerAllocation>,
  ) {}

  homepage() {
    return { message: 'Hello world!' };
  }

  async getAllocations(): Promise<CourseLecturerAllocationDocument[]> {
    const thisYear = new Date().getFullYear();
    const courseLecturerAllocations = await this.courseLecturerAllocationModel
      .find({ sessionYear: thisYear })
      .populate(['lecturer', 'course']);

    for await (const allocation of courseLecturerAllocations) {
      if (allocation.course) {
        allocation.course.specialization =
          await this.specializationService.findOne(
            allocation.course.specialization as unknown as string,
          );
      }
    }

    return courseLecturerAllocations;
  }
}
