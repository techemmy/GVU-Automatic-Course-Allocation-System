import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async homepage() {
    const courseAllocations = await this.appService.getAllocations();
    return {
      courseAllocations,
    };
  }

  @Get('/getTimetable')
  async getTimetable() {
    const courseAllocations = await this.appService.getAllocations();

    const courseToDayTable = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const getHoursDurations = () => [8, 19];
    const isTimeAvailableToday = (
      startTime: number,
      endTime: number,
      duration: number,
    ) => {
      return startTime + duration <= endTime;
    };

    const coursesPerDay = Math.ceil(courseAllocations.length / days.length);
    const defaultCourseDuration = 2;
    let courses_allocated = 0;

    for (let i = 0; i < days.length; i++) {
      let [startTime, endTime] = getHoursDurations();
      for (
        let j = 0;
        courses_allocated < courseAllocations.length && j < coursesPerDay;
        j++
      ) {
        const courseCode = courseAllocations[courses_allocated++]?.course?.code;
        if (isTimeAvailableToday(startTime, endTime, defaultCourseDuration)) {
          courseToDayTable[courseCode] = [days[i], startTime];
          startTime += defaultCourseDuration;
        }
      }
    }

    return {
      days,
      courseToDayTable,
      lectureHours: getHoursDurations(),
      defaultCourseDuration,
    };
  }
}
