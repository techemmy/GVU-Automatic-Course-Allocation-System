import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Render,
  Redirect,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { LecturersService } from 'src/lecturers/lecturers.service';
import { SpecializationService } from 'src/specialization/specialization.service';
import { SpecializationDocument } from 'src/specialization/schemas/specialization.schema';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lecturersService: LecturersService,
    private readonly specializationService: SpecializationService,
  ) {}

  @Get('/add')
  @Render('courses/add-course')
  async createCourseForm() {
    const specializations = await this.specializationService.findAll();
    return { specializations };
  }

  @Post('/add')
  @Redirect('back')
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    await this.coursesService.create(createCourseDto);
  }

  @Get('/')
  @Render('courses/all-courses')
  async getCourses() {
    const courses = await this.coursesService.findAll();
    return { courses };
  }

  @Get('/allocate')
  @Redirect('/')
  async allocateCourses(): Promise<void> {
    const courses = await this.coursesService.findAll();
    const lecturers = await this.lecturersService.findAll();
    const courseLecturerAllocations = {};

    lecturers.forEach((lecturer) => {
      if (!courseLecturerAllocations[lecturer.id.toString()]) {
        courseLecturerAllocations[lecturer.id.toString()] = [];
      }
    });

    for (const course of courses) {
      const courseSpec = course.specialization as SpecializationDocument;

      const lecturersWithSpec = lecturers.filter((lecturer) => {
        const specIds = lecturer.specializations.map(
          (spec: SpecializationDocument) => spec.id.toString(),
        );
        return specIds.includes(courseSpec.id.toString());
      });

      if (lecturersWithSpec.length < 1) {
        continue;
      }

      // choose lecturer with minimum courses assigned to them already
      let lecturerToAssign;
      for (const lecturer of lecturersWithSpec) {
        const lecturerId = lecturer.id.toString();
        if (!lecturerToAssign) {
          lecturerToAssign = lecturerId;
          continue;
        }

        if (
          courseLecturerAllocations[lecturerId].length <
          courseLecturerAllocations[lecturerToAssign].length
        ) {
          lecturerToAssign = lecturerId;
        }
      }

      courseLecturerAllocations[lecturerToAssign].push(course.id.toString());
    }

    await this.coursesService.allocateCourses(courseLecturerAllocations);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Get('/delete/:id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
