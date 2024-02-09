import { Controller, Render, Get, Req, Redirect, Post } from '@nestjs/common';

@Controller('lecturers')
export class LecturersController {
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
  createLecturer(@Req() req: Request) {
    console.log(req.body);

    return {};
  }
}
