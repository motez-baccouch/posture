import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //removes the non listed
      transform: true, //transforms the body to the dto ( instance of dto ) also transforms primitive objects if possible (from String to number for example)
      forbidNonWhitelisted: true, //responds with error
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3001);
}
bootstrap();
