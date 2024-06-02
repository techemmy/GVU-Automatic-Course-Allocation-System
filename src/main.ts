import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import {
  formatDate,
  formatSpecializations,
  isEmptyList,
  json,
} from './hbs/helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerHelper('fDate', formatDate);
  hbs.registerHelper('fSpecializations', formatSpecializations);
  hbs.registerHelper('isEmptyList', isEmptyList);
  hbs.registerHelper('json', json);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
