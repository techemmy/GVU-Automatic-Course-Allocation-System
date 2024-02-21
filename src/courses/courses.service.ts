import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const newCourse = await this.courseModel.create(createCourseDto);
    return newCourse;
  }

  async findAll(): Promise<CourseDocument[]> {
    const allCourses = await this.courseModel.find({});
    return allCourses;
  }

  async findOne(id: number): Promise<CourseDocument> {
    const course = await this.courseModel.findById(id);
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<void> {
    await this.courseModel.findByIdAndUpdate(id, updateCourseDto);
  }

  async remove(id: number): Promise<void> {
    await this.courseModel.findByIdAndDelete(id);
  }
}
