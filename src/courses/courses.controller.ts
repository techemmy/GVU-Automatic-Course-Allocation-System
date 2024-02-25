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

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/create')
  @Render('courses/add-course')
  createCourseForm() {
    return {};
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Get('/delete/:id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
