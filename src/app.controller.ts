import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  homepage() {
    return { message: 'Hello there!' };
  }
}
