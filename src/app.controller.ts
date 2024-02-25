import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { SpecializationService } from './specialization/specialization.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async homepage() {
    const courseAllocations = await this.appService.getAllocations();
    return { courseAllocations };
  }
}
