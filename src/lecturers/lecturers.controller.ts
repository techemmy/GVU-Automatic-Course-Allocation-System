import { Controller, Render, Get, Redirect, Post, Body } from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { LecturersService } from './lecturers.service';

@Controller('lecturers')
export class LecturersController {
  constructor(public lecturerService: LecturersService) { }

  @Get('/')
  @Render('lecturers/all-lecturers')
  getLecturers() {
    return {};
  }

  @Get('/add')
  @Render('lecturers/add-lecturer')
  createLecturerForm() {
    return {};
  }

  @Post('/add')
  @Redirect('back')
  async createLecturer(@Body() createLecturerDto: CreateLecturerDto) {
    await this.lecturerService.create(createLecturerDto);
    return {};
  }
}
