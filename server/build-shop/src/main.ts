import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './entity-not-found/entity-not-found.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new EntityNotFoundFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
