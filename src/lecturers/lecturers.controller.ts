import { Controller, Render, Get, Redirect, Post, Body } from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { LecturersService } from './lecturers.service';
import { DepartmentsService } from 'src/departments/departments.service';

@Controller('lecturers')
export class LecturersController {
  constructor(
    public lecturerService: LecturersService,
    public departmentService: DepartmentsService,
  ) {}

  @Get('/')
  @Render('lecturers/all-lecturers')
  async getLecturers() {
    const lecturers = await this.lecturerService.findAll();
    return { lecturers };
  }

  @Get('/add')
  @Render('lecturers/add-lecturer')
  async createLecturerForm() {
    const departments = await this.departmentService.findAll();
    return { departments };
  }

  @Post('/add')
  @Redirect('back')
  async createLecturer(@Body() createLecturerDto: CreateLecturerDto) {
    await this.lecturerService.create(createLecturerDto);
    return {};
  }
}
