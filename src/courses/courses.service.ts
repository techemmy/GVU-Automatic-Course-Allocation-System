import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { Model } from 'mongoose';
import {
  CourseLecturerAllocation,
  CourseLecturerAllocationDocument,
} from 'src/schemas/allocation.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(CourseLecturerAllocation.name)
    private courseLecturerAllocationModel: Model<CourseLecturerAllocationDocument>,
  ) {}

  async allocateCourses(
    lecturerToCoursesMapping: Map<string, string[]>,
  ): Promise<void> {
    const sessionYear = new Date().getFullYear();
    await this.courseLecturerAllocationModel.deleteMany({ sessionYear });

    for (const lecturerAndCourses of lecturerToCoursesMapping) {
      const [lecturerId, coursesId] = lecturerAndCourses;
      for await (const courseId of coursesId) {
        await this.courseLecturerAllocationModel.create({
          lecturer: lecturerId,
          course: courseId,
          sessionYear,
        });
      }
    }
  }

  async create(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const newCourse = await this.courseModel.create(createCourseDto);
    return newCourse;
  }

  async findAll(): Promise<CourseDocument[]> {
    const allCourses = await this.courseModel
      .find({})
      .populate('specialization');
    return allCourses;
  }

  async findOne(id: string): Promise<CourseDocument> {
    const course = await this.courseModel.findById(id);
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<void> {
    await this.courseModel.findByIdAndUpdate(id, updateCourseDto);
  }

  async remove(id: string): Promise<void> {
    await this.courseModel.findByIdAndDelete(id);
  }
}
