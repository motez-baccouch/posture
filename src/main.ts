import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RenderModule } from 'nest-next'
import Next from 'next'

async function bootstrap() {

  const app = Next({
    dev: process.env.NODE_ENV !== 'production'
  });

  await app.prepare();


  const server = await NestFactory.create(AppModule);

  const renderer = server.get(RenderModule);
  renderer.register(server,app);

  const configService = server.get(ConfigService);
  server.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //removes the non listed
      transform: true, //transforms the body to the dto ( instance of dto ) also transforms primitive objects if possible (from String to number for example)
      forbidNonWhitelisted: true, //responds with error
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await server.listen(process.env.APP_PORT || 3001);
}
bootstrap();
